import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-900">About Our Studio</h1>
            <p className="text-xl text-blue-700 mb-8">
              We're a team of designers and developers passionate about creating distinctive digital experiences with a
              neubrutalism aesthetic.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">Our Story</h2>
              <p className="text-blue-700 mb-4">
                Founded in 2020, our studio emerged from a desire to break away from the minimalist design trends that
                dominated the web. We saw an opportunity to bring back bold, expressive design that makes a statement.
              </p>
              <p className="text-blue-700 mb-4">
                Inspired by the brutalist architecture movement and early web design, we've developed our own
                neubrutalist approach that combines raw aesthetics with modern usability principles.
              </p>
              <p className="text-blue-700">
                Today, we work with forward-thinking brands and individuals who want to stand out in a crowded digital
                landscape with designs that are impossible to ignore.
              </p>
            </div>
            <div className="relative">
              <div className="bg-yellow-300 w-full h-80 md:h-96 rounded-lg border-4 border-blue-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] relative z-10">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our team"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="absolute top-6 -right-6 w-full h-80 md:h-96 bg-pink-300 rounded-lg border-4 border-blue-900 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-900 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Bold Expression",
                description: "We believe design should make a statement and leave a lasting impression.",
              },
              {
                title: "Functional Creativity",
                description: "Our designs are visually striking but never at the expense of usability and function.",
              },
              {
                title: "Digital Craftsmanship",
                description:
                  "We pay attention to every detail, creating experiences that are both beautiful and robust.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border-4 border-blue-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)]"
              >
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 border-2 border-blue-900">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-4 text-blue-900">{value.title}</h3>
                <p className="text-blue-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-900 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & Creative Director",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Jamie Lee",
                role: "Lead Designer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sam Taylor",
                role: "Senior Developer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Jordan Casey",
                role: "Project Manager",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-blue-100 rounded-lg border-4 border-blue-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] overflow-hidden"
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900">{member.name}</h3>
                  <p className="text-blue-700">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let's create something bold and distinctive for your brand.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-900 font-bold py-4 px-8 rounded-lg border-4 border-blue-500 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] hover:shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px]"
          >
            Get in Touch <ArrowRight className="inline ml-2" />
          </Link>
        </div>
      </section>
    </main>
  )
}

