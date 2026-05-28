'use client';

import { triggerComingSoonModal } from '@/components/coming-soon';
import InputFieldContainer, { VerificationInputField } from '@/components/ui/InputFieldContainer';
import VerificationSteps from '@/components/verification/VerificationSteps';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const fieldContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function CredentialsVerificationForm() {
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (licensePreview) URL.revokeObjectURL(licensePreview);
    };
  }, [licensePreview]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];
      if (!file) return;
      setLicenseFile(file);
      if (licensePreview) URL.revokeObjectURL(licensePreview);
      if (file.type.startsWith('image/')) {
        setLicensePreview(URL.createObjectURL(file));
      } else {
        setLicensePreview(null);
      }
    },
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLicenseFile(null);
    if (licensePreview) {
      URL.revokeObjectURL(licensePreview);
      setLicensePreview(null);
    }
  };

  return (
    <div className="max-w-165.25 mx-auto rounded-[32px] border py-10 px-6 md:py-10 md:px-20 space-y-22 bg-white">
      <VerificationSteps activeStep={1} />

      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="heading__medium">Verify your credentials</h2>
          <p className="body__medium text-secondary-3">
            This helps us ensure only qualified professionals join the plateform. Documents are
            encrypted and reviewed within 24 hour or less.
          </p>
        </div>

        <form autoComplete="on" className="space-y-10">
          <motion.div
            className="space-y-4"
            variants={fieldContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fieldVariants}>
              <VerificationInputField label="MDCN licence number" htmlFor="licenseNumber">
                <Image
                  src="/assets/verification-assets/license.svg"
                  alt="Licence icon"
                  height={20}
                  width={20}
                />
                <input
                  id="licenseNumber"
                  type="text"
                  placeholder="Enter License number"
                  className="py-1 w-full focus:outline-none"
                />
              </VerificationInputField>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <InputFieldContainer label="National identity number (NIN)" htmlFor="nin">
                <input
                  id="nin"
                  type="text"
                  placeholder="Enter your 11-digit NIN"
                  className="py-3 w-full input__field"
                />
              </InputFieldContainer>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <InputFieldContainer label="Upload medical license" htmlFor="medicalLicense">
                <div {...getRootProps()}>
                  <input {...getInputProps({ id: 'medicalLicense' })} />
                  <motion.div
                    className="flex min-h-35 flex-col items-center justify-center rounded-[16px] border border-dashed px-6 py-4 text-center gap-2.5 cursor-pointer"
                    animate={{
                      scale: isDragActive ? 1.02 : 1,
                      backgroundColor: isDragActive ? '#EBF5FF' : '#ffffff',
                      borderColor: isDragActive ? '#1565c0' : '#69A7FF',
                    }}
                    whileHover={!licenseFile ? { scale: 1.02, backgroundColor: '#F8FBFF' } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {licenseFile ? (
                      <div className="flex flex-col items-center gap-2 w-full">
                        {licensePreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={licensePreview}
                            alt="License preview"
                            className="h-24 w-24 rounded-xl object-cover border border-[#E0E0E0]"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#EAF2FF]">
                            <span className="text-xs font-bold text-primary-blue">PDF</span>
                          </div>
                        )}
                        <p className="body__medium text-text-primary font-medium truncate max-w-full px-4">
                          {licenseFile.name}
                        </p>
                        <p className="body__small text-neutral-color">
                          {(licenseFile.size / 1024).toFixed(1)} KB
                        </p>
                        <button
                          type="button"
                          onClick={handleRemove}
                          className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FF]">
                          <Image
                            src="/assets/verification-assets/upload-icon.svg"
                            alt="Upload Icon"
                            width={48}
                            height={48}
                          />
                        </div>
                        <p className="body__medium text-text-primary">
                          {isDragActive ? 'Drop your file here' : 'Click to upload or drag & drop'}
                        </p>
                        <p className="text-neutral-color body__small">
                          Front of your MDCN license PDF, PNG, JPG (max 10MB)
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>

                {fileRejections[0] && (
                  <p className="mt-1 text-xs font-medium italic text-red-500 text-right">
                    {fileRejections[0].errors[0].message}
                  </p>
                )}
              </InputFieldContainer>
            </motion.div>
          </motion.div>

          <div>
            <motion.button
              type="submit"
              className="body_large btn__primary text-white bg-primary-blue w-full"
              whileHover={{ scale: 1.015, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              onClick={() => triggerComingSoonModal()}
            >
              <span>Save and Continue</span>
              <ArrowRight className="size-6 text-white" />
            </motion.button>

            <p className="body__medium text-neutral-color text-center mt-1 text-sm">
              Your uploaded documents are automatically saved to the system
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
