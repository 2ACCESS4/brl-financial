import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "BRL Financial has been instrumental in helping me prepare for retirement. Their personalized approach and expert guidance have given me confidence in my financial future.",
    name: "Robert Martinez",
    since: "Client Since 2015",
    initials: "RM"
  },
  {
    text: "The team at BRL Financial took the time to understand my goals and created a financial plan that addressed my specific needs. I couldn't be happier with the results.",
    name: "Jennifer Parker",
    since: "Client Since 2018",
    initials: "JP"
  },
  {
    text: "Working with BRL Financial has been a game-changer for my family's financial planning. Their expertise and attentive service have exceeded my expectations.",
    name: "David Wilson",
    since: "Client Since 2016",
    initials: "DW"
  },
  {
    text: "I've been a client for over 5 years and have seen significant growth in my investments thanks to BRL Financial's strategic approach and market insights.",
    name: "Elizabeth Chen",
    since: "Client Since 2019",
    initials: "EC"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding bg-slate-50">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Hear from some of our satisfied clients.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center text-amber-500 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-700 mb-6 italic">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mr-4">
                            <span className="text-slate-700 font-medium">{testimonial.initials}</span>
                          </div>
                          <div>
                            <p className="font-medium text-primary">{testimonial.name}</p>
                            <p className="text-sm text-slate-500">{testimonial.since}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 mx-2" />
              <CarouselNext className="relative inset-0 translate-y-0 mx-2" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
