import { Facebook, Phone } from "lucide-react";

function Footer() {
  const locations = [
    {
      name: "Ozone Computer Kamburupitiya",
      address: "Matara Road, Kamburupitiya",
      phone: "0769909333",
      whatsapp: "https://wa.me/94769909333",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4690.330364161652!2d80.56458013594766!3d6.081342783780532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae145b04f654947%3A0x9cb727e52ae67997!2sOZONE%20COMPUTERS!5e1!3m2!1sen!2slk!4v1741602279900!5m2!1sen!2slk",
    },
    {
      name: "Ozone Computer Deiyandara",
      address: "Matara Road, Deiyandara",
      phone: "0777539333",
      whatsapp: "https://wa.me/94777539333",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4689.701329884412!2d80.59788094805697!3d6.153045957766351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae14572f474d63d%3A0xab10bf588aa614ae!2sOZONE%20COMPUTERS!5e1!3m2!1sen!2slk!4v1741602335372!5m2!1sen!2slk",
    },
    {
      name: "Ozone Computer Embilipitiya",
      address: "Matara Road, Embilipitiya",
      phone: "0742789533",
      whatsapp: "https://wa.me/94742789533",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.8597059856456!2d80.855327310485!3d6.330013693633115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae401005df03ae7%3A0xa584b1d777e5b0d1!2sOzone%20Computers%20Embilipitiya!5e1!3m2!1sen!2slk!4v1741602406684!5m2!1sen!2slk",
    },
  ];

  return (
    <footer className="bg-gray-500 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="space-y-2 bg-gray-800 p-4 rounded-lg shadow-lg relative">
              <h3 className="text-lg font-semibold">{location.name}</h3>
              <p className="text-sm">{location.address}</p>
              <p className="text-sm flex items-center">
                {location.phone}
              </p>
              <a
                href={location.whatsapp}
                className="absolute top-4 right-4 text-green-500 hover:text-green-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone />
              </a>
              <div className="w-full h-32">
                <iframe
                  title={location.name}
                  className="w-full h-full border-0 rounded-md"
                  frameBorder="0"
                  src={location.mapSrc}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-4">
          <span className="font-medium">FOLLOW US:</span>
          <a
            href="https://web.facebook.com/ozonecomputerslk/"
            className="text-gray-300 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-700 pt-4 text-xs text-gray-400">
          &copy; 2024 Ozone Computers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;