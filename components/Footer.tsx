type Dictionary = {
  footer: {
    description: string;
    product: string;
    features: string;
    pricing: string;
    blog: string;
    support: string;
    faq: string;
    contact: string;
    privacy: string;
    copyright: string;
  };
};

export default function Footer({ dict, lang }: { dict: Dictionary; lang: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Kanbun"
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">
                Kanbun
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {dict.footer.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Links</h4>
            <ul className="space-y-3">
              <li>
                <a href={`/${lang}/blog`} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  {dict.footer.blog}
                </a>
              </li>
              <li>
                <a href={`/${lang}/privacy`} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  {dict.footer.privacy}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Kanbun. {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
