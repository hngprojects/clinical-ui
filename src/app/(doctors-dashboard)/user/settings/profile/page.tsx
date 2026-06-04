import Image from 'next/image';

export default function Page() {
  return (
    <div className="px-4 md:px-6">
      <header className=" font-inter ">
        <h1 className="text-settings-header-text text-[40px] font-bold leading-13 tracking-[-0.8px]">
          {' '}
          Profile
        </h1>
        <p className="text-settings-subheader-text font-medium leading-[150%] tracking-[-0.16px]">
          Manage your personal and professional information
        </p>
      </header>

      <div className="bg-white rounded-settings-radius px-13 py-13">
        <h2 className="py-[6.615px] px-[13.231px] text-center rounded-settings-radius bg-outline-border w-fit text-3xl font-semibold leading-[130%] tracking-[-0.635px]">
          My Profile
        </h2>

        {/* Profile section 1 */}
        <div className="border border-primary-blue rounded-[26.462px] p-10 flex items-center justify-between">
          <div className="flex items-center gap-x-14">
            <div className="size-[190.525px] rounded-full bg-settings-img-placeholder"></div>
            <div className="border">
              <h2 className="font-semibold leading-[130%] tracking-[-0.635px] text-3xl border">
                Dr. Light Adeyemi
              </h2>
              <p className="text-[23.816px] leading-[150%] tracking-[-0.238px]">
                Senior Cardiologist
              </p>
              <p className="text-[21.169px] font-medium leading-[150%] tracking-[-0.212px]">
                Ikeja, Lagos
              </p>
            </div>
          </div>

          <button className="rounded-[6.615px] border border-text-secondary flex items-center gap-[7.939px] py-[10.585px] px-[15.877px]">
            <Image src="/assets/settings/edit-icon.svg" alt="Edit" width={15.877} height={15.877} />
            <span className="text-text-secondary text-[15.877px] leading-[21.169px] font-sans ">
              Edit
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
