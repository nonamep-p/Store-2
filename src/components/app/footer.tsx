'use client';
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Footer() {
  const footerLinks = {
    Shop: ["New Arrivals", "Men's", "Women's", "Sale", "Collections"],
    Support: ["Contact Us", "FAQs", "Shipping", "Returns", "Size Guide"],
    Company: ["About Us", "Careers", "Sustainability", "Press", "Affiliates"],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-1">
                <h4 className="font-semibold mb-4">Stay in the loop</h4>
                <p className="text-muted-foreground text-sm mb-4">
                    Subscribe to our newsletter for the latest drops, deals, and updates.
                </p>
                <form className="flex gap-2">
                    <Input type="email" placeholder="Enter your email" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                 {Object.entries(footerLinks).map(([category, links]) => (
                    <div key={category}>
                    <h4 className="mb-4 font-semibold">{category}</h4>
                    <ul className="space-y-3">
                        {links.map((link) => (
                        <li key={link}>
                            <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                            >
                            {link}
                            </a>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
        </div>


        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Zenith Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
