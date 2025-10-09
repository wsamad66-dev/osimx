'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import DocumentUpload from '@/components/student/DocumentUpload';

// Brand colors
const BRAND_COLORS = {
  primary: '#26a5de',
  secondary: '#232d6e',
  accent: '#f29100',
  white: '#ffffff',
};

interface FormData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  
  // Step 2: Academic Info
  currentEducationLevel: string;
  institution: string;
  fieldOfStudy: string;
  desiredProgram: string;
  desiredCountry: string;
  
  // Step 3: Documents
  documents: File[];
  
  // Step 4: Additional
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const steps = [
  { id: 1, title: 'Personal Info', icon: <User className="w-5 h-5" /> },
  { id: 2, title: 'Academic Details', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 3, title: 'Documents', icon: <Upload className="w-5 h-5" /> },
  { id: 4, title: 'Complete', icon: <CheckCircle2 className="w-5 h-5" /> },
];

const countries = [
  'France', 'Canada', 'United Kingdom', 'Germany', 'USA', 
  'Australia', 'Netherlands', 'Belgium', 'Switzerland', 'Spain'
];

const educationLevels = [
  'High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'
];

const programs = [
  'Computer Science', 'Engineering', 'Business Administration', 'Medicine',
  'Law', 'Arts & Humanities', 'Social Sciences', 'Natural Sciences'
];

export default function StudentRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    currentEducationLevel: '',
    institution: '',
    fieldOfStudy: '',
    desiredProgram: '',
    desiredCountry: '',
    documents: [],
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    }

    if (step === 2) {
      if (!formData.currentEducationLevel) newErrors.currentEducationLevel = 'Education level is required';
      if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
      if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
      if (!formData.desiredProgram) newErrors.desiredProgram = 'Desired program is required';
      if (!formData.desiredCountry) newErrors.desiredCountry = 'Destination country is required';
    }

    if (step === 3) {
      if (formData.documents.length === 0) {
        newErrors.documents = 'Please upload at least one document';
      }
    }

    if (step === 4) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Prepare form data for API
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'documents') {
          formData.documents.forEach((file) => {
            formDataToSend.append('documents[]', file);
          });
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      // Send registration request
      const response = await fetch('/api/students/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success! Show confirmation
      alert(`✅ ${data.message}\n\nWelcome ${data.data.name}! You've successfully uploaded ${data.data.documentsUploaded} document(s).`);
      
      // Redirect to success page or dashboard
      window.location.href = '/student/welcome';
    } catch (error) {
      console.error('Registration error:', error);
      alert(`❌ ${error instanceof Error ? error.message : 'Registration failed. Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6" style={{ color: BRAND_COLORS.secondary }}>
              Let's Get to Know You
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Enter your first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Enter your last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="+1 234 567 8900"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.phone}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => updateFormData('nationality', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.nationality ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Your country"
                  />
                </div>
                {errors.nationality && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.nationality}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6" style={{ color: BRAND_COLORS.secondary }}>
              Your Academic Background
            </h3>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Current Education Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.currentEducationLevel}
                onChange={(e) => updateFormData('currentEducationLevel', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.currentEducationLevel ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select your education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.currentEducationLevel && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.currentEducationLevel}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Current/Most Recent Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => updateFormData('institution', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.institution ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="University or school name"
              />
              {errors.institution && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.institution}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Current Field of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) => updateFormData('fieldOfStudy', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="e.g., Computer Science, Business"
              />
              {errors.fieldOfStudy && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.fieldOfStudy}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Desired Program <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.desiredProgram}
                onChange={(e) => updateFormData('desiredProgram', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.desiredProgram ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select program</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              {errors.desiredProgram && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.desiredProgram}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Desired Study Destination <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.desiredCountry}
                onChange={(e) => updateFormData('desiredCountry', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.desiredCountry ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select destination</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.desiredCountry && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.desiredCountry}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6" style={{ color: BRAND_COLORS.secondary }}>
              Upload Your Documents
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Required documents:</strong> Passport, Academic transcripts, Language test scores (if available)
              </p>
            </div>

            <DocumentUpload
              files={formData.documents}
              onFilesChange={(files) => updateFormData('documents', files)}
              error={errors.documents}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6" style={{ color: BRAND_COLORS.secondary }}>
              Secure Your Account
            </h3>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Create Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12`}
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1 ml-8">
                  <AlertCircle className="w-4 h-4" /> {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Application Summary</h4>
              <div className="space-y-1 text-sm text-green-800">
                <p>👤 {formData.firstName} {formData.lastName}</p>
                <p>✉️ {formData.email}</p>
                <p>🎓 {formData.desiredProgram} in {formData.desiredCountry}</p>
                <p>📄 {formData.documents.length} document(s) uploaded</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-blue-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                  }}
                >
                  {step.icon}
                </motion.div>
                <span className="text-xs mt-2 font-medium text-gray-600 hidden md:block">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-200">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: BRAND_COLORS.primary }}
                    initial={{ width: '0%' }}
                    animate={{
                      width: currentStep > step.id ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </p>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <motion.button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
        )}

        {currentStep < 4 ? (
          <motion.button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: BRAND_COLORS.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: BRAND_COLORS.accent }}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Complete Registration
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
