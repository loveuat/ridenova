export function AboutUs() {
  return (
    <section className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          About Us
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          We are a passionate team dedicated to delivering innovative digital
          solutions that help businesses grow, scale, and succeed in the modern
          world.
        </p>
      </div>

      {/* Company Overview */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/about-image.jpg"
              alt="About Us"
              className="rounded-2xl w-full"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-400 mb-4">
              We specialize in web development, UI/UX design, mobile
              applications, and digital transformation services. Our mission is
              to create exceptional digital experiences that drive results.
            </p>
            <p className="text-gray-400">
              With years of industry experience, we combine creativity,
              technology, and strategy to build solutions tailored to our
              clients' needs.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border border-gray-800 rounded-xl p-6">
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="text-gray-400 mt-2">Projects Delivered</p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="text-gray-400 mt-2">Happy Clients</p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <h3 className="text-4xl font-bold">10+</h3>
            <p className="text-gray-400 mt-2">Years Experience</p>
          </div>

          <div className="border border-gray-800 rounded-xl p-6">
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="text-gray-400 mt-2">Support</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400">
              To empower businesses with cutting-edge technology and innovative
              digital solutions that create lasting value.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-400">
              To become a trusted global technology partner known for quality,
              innovation, and excellence.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Let's Build Something Great Together
        </h2>
        <p className="text-gray-400 mb-8">
          Ready to transform your ideas into reality? Get in touch with us
          today.
        </p>

        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Contact Us
        </button>
      </div>
    </section>
  );
}

