"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting){
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15}
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
            <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            >
            {children}
        </div>
    )
}