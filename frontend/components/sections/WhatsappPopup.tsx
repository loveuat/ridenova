"use client";

interface WhatsappPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsappPopup({
  isOpen,
  onClose,
}: WhatsappPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 z-50 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl">
        <div className="bg-green-500 p-4 rounded-t-xl text-white">
          <h3 className="font-bold">Chat on WhatsApp</h3>
          <p className="text-sm">Typically replies within minutes</p>
        </div>

        <div className="p-5">
          <p className="mb-4 text-gray-600">
            Hi 👋 Need help with WordPress, Next.js or AI solutions?
          </p>

          <a
            href="https://wa.me/917987408207?text=Hi%20AIS%20Technolabs,%20I%20want%20to%20discuss%20my%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-green-500 py-3 text-center font-semibold text-white hover:bg-green-600"
          >
            Start WhatsApp Chat
          </a>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-lg border py-2"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
