import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/grammar" className="text-gray-400 hover:text-gray-300">
              {t("grammar")}
            </Link>
            <Link href="/lessons" className="text-gray-400 hover:text-gray-300">
              {t("lessons")}
            </Link>
            <Link href="/vocabulary" className="text-gray-400 hover:text-gray-300">
              {t("vocabulary")}
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Tagalog Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

