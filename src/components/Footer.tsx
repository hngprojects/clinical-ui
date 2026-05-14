import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#11519A] text-white">

            {/* Background circles */}
            <div className="pointer-events-none absolute right-[-150px] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[#3A78C8]/20">
                <div className="absolute inset-[60px] rounded-full border-[22px] border-[#5C92D8]/25" />
                <div className="absolute inset-[135px] rounded-full border-[18px] border-[#78A7E3]/18" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-14 ">

                {/* Logo row - TOP, full width */}
                <div className="flex items-center gap-3 mb-10 border-b border-white/15 pb-5">
                    <Image
                        src="/Subtract.png"
                        alt="logo"
                        width={24}
                        height={24}
                        unoptimized
                    />
                    <h2 className="font-playfair text-[31.56px] font-medium leading-none tracking-[-0.02em]">
                        Clinsight
                    </h2>
                </div>

                {/* MIDDLE SECTION */}
                <div className="flex flex-col lg:flex-row lg:justify-between border-b border-white/15 pb-10">

                    {/* Description */}
                    <p className="max-w-[360px] text-sm leading-6 text-blue-100">
                        Clinsight helps you turn complex medical reports into clear,
                        simple explanations you can actually understand.
                    </p>

                    {/* Nav columns */}
                    <div className="mt-6 grid grid-cols-3 gap-16 text-sm lg:mt-0">

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.08em]">
                                Platform
                            </h3>
                            <ul className="mt-5 space-y-2 text-blue-100">
                                <li>How It Works</li>
                                <li>Join Waitlist</li>
                                <li>FAQ</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.08em]">
                                Company
                            </h3>
                            <ul className="mt-5 space-y-2 text-blue-100">
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.08em]">
                                Legal
                            </h3>
                            <ul className="mt-5 space-y-2 text-blue-100">
                                <li>Privacy Policy</li>
                                <li>Terms and Conditions</li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* BOTTOM */}
                <div className="pt-6 text-xs text-blue-100">
                    ©2026. All Rights Reserved
                </div>

            </div>
        </footer>
    );
}