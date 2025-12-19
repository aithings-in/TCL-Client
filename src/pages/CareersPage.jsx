import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  Zap,
  Users,
  Target,
  GraduationCap,
  Sparkles,
  Star,
  ChevronRight,
  Upload,
  Send,
  DollarSign,
  Award,
} from "lucide-react";
import content from "@/data/content.json";

// Icon mapping for dynamic icons
const iconMap = {
  Star,
  Briefcase,
  Zap,
  Target,
  GraduationCap,
  Sparkles,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || Star;
};

const Section = ({ children, id, className = "" }) => (
  <section
    id={id}
    className={`py-16 md:py-24 relative overflow-hidden ${className}`}
  >
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const SectionTitle = ({ children, subtitle, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    viewport={{ once: true }}
    className={`text-center mb-12 md:mb-16 ${className}`}
  >
    <h1 className="text-4xl md:text-6xl font-black mb-4 text-brandPink">
      {children}
    </h1>
    {subtitle && (
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

const BenefitCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, type: "spring" }}
    viewport={{ once: true }}
    className="group p-8 text-center h-full bg-white border border-gray-200 hover:bg-brandBlue hover:-translate-y-1 transition-all duration-300"
  >
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-brandPink/10 text-brandPink group-hover:bg-white group-hover:text-brandPink">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-brandBlue group-hover:text-brandPink mb-3">
      {title}
    </h3>
    <p className="text-gray-700 group-hover:text-white text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    resume: null,
    role: "",
    college: "",
    course: "",
    city: "",
    currentAddress: "",
    permanentAddress: "",
    experience: "",
    additionalInfo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.resume
    ) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields and upload your resume.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      // 1. Upload resume to Supabase Storage
      const fileExt = formData.resume.name.split(".").pop();
      const newFileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const { error: fileError } = await supabase.storage
        .from("career-resumes")
        .upload(newFileName, formData.resume);

      if (fileError) throw fileError;

      const { data: urlData } = supabase.storage
        .from("career-resumes")
        .getPublicUrl(newFileName);
      const resumeUrl = urlData.publicUrl;

      // 3. Insert application data into the database
      const { error: dbError } = await supabase
        .from("career_applications")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            linkedin_url: formData.linkedin,
            portfolio_url: formData.portfolio,
            resume_url: resumeUrl,
            applying_for: formData.role,
            college_university: formData.college,
            course: formData.course,
            current_city: formData.city,
            current_address: formData.currentAddress,
            permanent_address: formData.permanentAddress,
            experience: formData.experience,
            additional_info: formData.additionalInfo,
          },
        ]);

      if (dbError) throw dbError;

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Error",
        description: `Could not submit your application: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-white border border-gray-200 rounded-2xl p-8"
      >
        <h3 className="text-3xl font-bold text-brandBlue mb-4">
          Application Submitted!
        </h3>
        <p className="text-gray-700 mb-6">
          Thank you for applying. We've received your application and will be in
          touch if your profile matches our requirements.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      viewport={{ once: true }}
      className="bg-brandBlue border border-gray-200 rounded-2xl p-6 md:p-8"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          >
            <option value="" className="text-gray-500">
              Select Role *
            </option>
            {content.careersPage.roles.internshipRoles.map((role) => (
              <option key={role.title} value={role.title}>
                {role.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="college"
            placeholder="College/University Name"
            value={formData.college}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <input
            type="text"
            name="course"
            placeholder="Course/Degree"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <input
            type="text"
            name="city"
            placeholder="Current City"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <input
            type="text"
            name="currentAddress"
            placeholder="Current Full Address"
            value={formData.currentAddress}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <input
            type="text"
            name="permanentAddress"
            placeholder="Permanent Address"
            value={formData.permanentAddress}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <input
            type="url"
            name="portfolio"
            placeholder="Portfolio/GitHub URL"
            value={formData.portfolio}
            onChange={handleInputChange}
            className="md:col-span-2 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
          />
          <textarea
            name="experience"
            placeholder="Tell us about your relevant experience..."
            value={formData.experience}
            onChange={handleInputChange}
            className="md:col-span-2 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
            rows="3"
          ></textarea>
          <textarea
            name="additionalInfo"
            placeholder="Anything else you'd like us to know?"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="md:col-span-2 w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
            rows="3"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="resume-upload"
            className="w-full p-3 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 text-gray-600 cursor-pointer flex items-center justify-center hover:border-brandPink hover:text-brandPink transition-colors"
          >
            <Upload className="mr-2 h-5 w-5" />
            <span>{fileName || "Upload Your Resume * (.pdf, .doc)"}</span>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-brandPink hover:bg-brandPink/90 text-white text-lg font-bold py-4 mt-4"
          disabled={isLoading}
        >
          <Send className="mr-2 h-5 w-5" />{" "}
          {isLoading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </motion.div>
  );
};

const CareersPage = () => {
  const scrollToApply = () => {
    document.getElementById("apply").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pt-32 pb-20 bg-white">
        <Section
          id="hero-careers"
          className="min-h-[50vh] flex items-center justify-center text-center"
        >
          <SectionTitle subtitle={content.careersPage.hero.subtitle}>
            {content.careersPage.hero.title}
          </SectionTitle>
        </Section>

        <Section id="why-join">
          <SectionTitle>{content.careersPage.whyJoin.title}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.careersPage.whyJoin.items.map((item, index) => {
              const IconComponent = getIcon(item.icon);
              return (
                <BenefitCard
                  key={item.id}
                  icon={<IconComponent size={24} />}
                  title={item.title}
                  description={item.description}
                  delay={(index + 1) * 0.1}
                />
              );
            })}
          </div>
        </Section>

        <Section id="eligibility">
          <SectionTitle>{content.careersPage.eligibility.title}</SectionTitle>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            {content.careersPage.eligibility.items.map((item, index) => {
              const IconComponent = getIcon(item.icon);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className="p-6 rounded-lg bg-white border border-gray-200"
                >
                  <IconComponent className="mx-auto h-12 w-12 text-brandPink mb-4" />
                  <h3 className="text-xl font-bold text-brandBlue">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Section>

        <Section id="roles">
          <SectionTitle>{content.careersPage.roles.title}</SectionTitle>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-5xl mx-auto"
          >
            {content.careersPage.roles.internshipRoles.map((role, index) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                key={role.title}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-xl mb-4 border border-gray-200 bg-white overflow-hidden"
                >
                  <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg md:text-xl font-bold text-brandBlue">
                        {role.title}
                      </span>
                      <span className="text-sm text-gray-600 font-normal hidden md:inline">
                        {role.positions} Position(s)
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-6 pt-0">
                    <p className="text-gray-700 mb-6">{role.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-brandPink/10 text-brandPink text-xs font-semibold px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                      <div className="space-y-3">
                        <h4 className="font-bold text-base text-brandBlue flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                          Internship Compensation
                        </h4>
                        <div className="pl-7">
                          <p className="font-bold text-gray-900">
                            {role.salary}
                          </p>
                          <p className="text-xs text-gray-600">Stipend</p>
                        </div>
                        <div className="pl-7">
                          <p className="font-bold text-gray-900">
                            {role.bonus}
                          </p>
                          <p className="text-xs text-gray-600">
                            Performance Bonus
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-bold text-base text-brandBlue flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-600" />
                          Full-Time Opportunity (PPO)
                        </h4>
                        <div className="pl-7">
                          <p className="font-bold text-gray-900">{role.ctc}</p>
                          <p className="text-xs text-gray-600">Total CTC</p>
                        </div>
                        <div className="pl-7">
                          <p className="font-bold text-gray-900">
                            {role.fixed} (Fixed) + {role.variable} (Variable)
                          </p>
                          <p className="text-xs text-gray-600">Pay Structure</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={scrollToApply}
                      className="w-full md:w-auto mt-6 bg-brandPink hover:bg-brandPink/90 text-white"
                    >
                      Apply For This Role{" "}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </Section>

        <Section id="apply">
          <SectionTitle>{content.careersPage.apply.title}</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <ApplicationForm />
          </div>
        </Section>
      </div>
    </motion.div>
  );
};

export default CareersPage;
