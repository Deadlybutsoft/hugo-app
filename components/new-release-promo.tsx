"use client"

export function NewReleasePromo() {
  return (
    <section className="mt-12 w-full">
      <div className="mx-auto max-w-4xl rounded-[40px] border border-black/5 dark:border-white/20 p-2 shadow-sm">
        <div
          className="relative mx-auto h-[400px] max-w-4xl overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 p-2 shadow-[4px_4px_0px_0px_rgba(208,254,23,1)] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dkvkxermy/image/upload/v1764339276/emral_marbel_green_glossy_bg_f_u5mafc.jpg')"
          }}
        >

          <div className="relative z-10">
            <div className="mt-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Chat. Upload. Protect Your IP.</h2>
              <p className="text-xl text-white/90 mb-8">Built to make ownership effortless.</p>
              <div className="flex items-center justify-center">
                <a href="/docs/get-started">
                  <div className="group border-2 border-[#D0FE17] bg-[#D0FE17] flex h-[64px] cursor-pointer items-center gap-2 rounded-full p-[11px] mt-20">
                    <div className="bg-white flex h-[43px] items-center justify-center rounded-full border-none">
                      <p className="mr-3 ml-2 flex items-center justify-center gap-2 font-medium tracking-tight text-black font-[family-name:var(--font-bricolage)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-globe animate-spin"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                          <path d="M2 12h20"></path>
                        </svg>
                        Get started now
                      </p>
                    </div>
                    <div className="border-border flex size-[26px] items-center justify-center rounded-full border-2 transition-all ease-in-out group-hover:ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right transition-all ease-in-out group-hover:rotate-45"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
