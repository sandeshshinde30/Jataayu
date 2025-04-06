import { mr } from './mr';

export const translations = {
  en: {
    // App Name
    "appName": "JATAAYU",

    // Navigation
    "nav": {
      "home": "Home",
      "events": "Events",
      "about": "About",
      "dashboard": "Dashboard",
      "login": "Login",
      "logout": "Logout",
      "register": "Register",
      "notifications": "Notifications",
      "changeLanguage": "Change Language",
      "settings": "Settings",
      "profile": "Profile",
      "createEvent": "Create Event",
      "admin": "Admin",
      "effects": "Effects",
      "initiatives": "Initiatives",
      "contact": "Contact",
      "management": "Management",
      // Submenu translations
      "initiativesRehabilitation": "Rehabilitation Centers",
      "initiativesOutreach": "Community Outreach",
      "initiativesEducation": "Education Programs",
      "initiativesPolicy": "Policy Measures",
      "contactDirectory": "Directory",
      "contactHelpline": "Helpline",
      // About submenu translations
      "aboutOverview": "Overview",
      "aboutMission": "Mission",
      "aboutObjectives": "Objectives"
    },

    // Objectives Page
    "objectives": {
      "title": "Our Objectives",
      "subtitle": "Working towards a drug-free society through comprehensive initiatives",
      "list": {
        "society": {
          "title": "Creating a Drug-Free Society",
          "description": "Educating people about the harmful effects of addiction and inspiring them to adopt a drug-free lifestyle."
        },
        "awareness": {
          "title": "Conducting Awareness Campaigns",
          "description": "Implementing awareness programs in schools, colleges, workplaces, and communities about addiction prevention."
        },
        "counseling": {
          "title": "Providing Counseling and Treatment",
          "description": "Offering medical, psychological, and social support for rehabilitation of individuals affected by addiction."
        },
        "youth": {
          "title": "Special Programs for Youth and Students",
          "description": "Running educational and empowerment programs to keep the younger generation away from addiction."
        },
        "family": {
          "title": "Supporting Families",
          "description": "Providing emotional support and guidance to families affected by addiction."
        },
        "policy": {
          "title": "Supporting Drug-Free Policies and Laws",
          "description": "Working with government and social organizations to implement effective measures for addiction eradication."
        },
        "rehabilitation": {
          "title": "Rehabilitation and Employment Opportunities",
          "description": "Creating employment and skill development opportunities for rehabilitated individuals to help them live with dignity."
        }
      }
    },

    // Mission Page
    "mission": {
      "title": "Our Mission",
      "vision": "Our Vision",
      "visionText": "Our mission is to build a strong, healthy, and addiction-free society. Through awareness, education, counseling, and rehabilitation, we work to free individuals from the grip of addiction. We are committed to inspiring each person to embrace a positive lifestyle and brighten their future.",
      "purpose": "Our Purpose",
      "purposeText": "To provide comprehensive support and rehabilitation services for addiction recovery, as well as work towards addiction prevention and awareness.",
      "goals": "Strategic Goals",
      "goal1": "Reduce addiction rates through prevention and early intervention programs",
      "goal2": "Provide accessible and effective treatment services",
      "goal3": "Build strong community partnerships and support networks",
      "goal4": "Increase public awareness and education about addiction",
      "goal5": "Support research and evidence-based practices in addiction treatment",
      "commitment": "Our Commitment",
      "commitmentText": "We are committed to serving our community with compassion, integrity, and excellence in all our programs and services."
    },

    // Home Page
    "home": {
      "hero": {
        "title": "Join our mission to create a drug-free society in {location}",
        "subtitle": "Together, we can overcome addiction and build a healthier community",
        "description": "We provide comprehensive support and resources for addiction recovery.",
        "viewEvents": "View Our Events",
        "learnMore": "Learn More",
        "embraceHealthier": "Embrace a Healthier Tomorrow"
      },
      "services": {
        "title": "Our Services",
        "subtitle": "We provide comprehensive support for individuals and families affected by addiction",
        "counseling": {
          "title": "Counseling Services",
          "description": "Professional therapy sessions to address mental health aspects of addiction recovery"
        },
        "support": {
          "title": "Support Groups",
          "description": "Connect with others facing similar challenges in a safe, supportive environment"
        },
        "rehabilitation": {
          "title": "Rehabilitation Programs",
          "description": "Comprehensive treatment programs to help rebuild life skills and sustain recovery"
        }
      },
      "effects": {
        "title": "Effects of Drug Addiction",
        "subtitle": "Understanding the impact of addiction is the first step toward recovery",
        "physical": {
          "title": "Physical Health",
          "description": "Drug addiction can lead to severe physical health problems including organ damage, respiratory issues, and increased risk of infectious diseases"
        },
        "mental": {
          "title": "Mental Health",
          "description": "Substance abuse often results in depression, anxiety, and other mental health disorders that require professional treatment"
        },
        "social": {
          "title": "Social Impact",
          "description": "Addiction affects not just the individual but their family, friends, and the entire community through broken relationships and social isolation"
        }
      },
      "helplines": {
        "title": "24/7 Helplines",
        "subtitle": "Reach out for professional support anytime, anywhere",
        "national": {
          "name": "National Drug Helpline",
          "number": "1800-11-0031",
          "description": "24/7 confidential support and guidance"
        },
        "centers": {
          "name": "De-Addiction Centers",
          "number": "1800-11-0032",
          "description": "Find treatment centers near you"
        },
        "crisis": {
          "name": "Crisis Helpline",
          "number": "1800-11-0033",
          "description": "Emergency assistance and intervention"
        },
        "callNow": "Call Now",
        "viewResources": "View All Support Resources"
      }
    },

    // About Page
    "about": {
      "title": "About JATAAYU",
      "subtitle": "A comprehensive campaign to combat drug abuse and create a healthier society",
      "description": "JATAAYU (Joint Action on drug Trafficking And drug Abuse for Youth Upliftment) is a nationwide campaign that brings together government agencies, healthcare providers, community organizations, and citizens to fight against drug abuse. Our mission is to create a drug-free society through prevention, treatment, and rehabilitation programs.",
      "initiatives": {
        "title": "Government Initiatives",
        "rehabilitation": {
          "title": "Rehabilitation Centers",
          "description": "Government-funded rehabilitation centers providing comprehensive treatment and support services",
          "points": [
            "Free medical treatment and counseling",
            "Residential rehabilitation programs",
            "Aftercare and follow-up services"
          ]
        },
        "community": {
          "title": "Community Outreach",
          "description": "Grassroots level programs to create awareness and prevent substance abuse",
          "points": [
            "Street plays and awareness campaigns",
            "Community support groups",
            "Family counseling services"
          ]
        },
        "education": {
          "title": "Education Programs",
          "description": "School and college-based programs to educate youth about drug abuse",
          "points": [
            "School prevention programs",
            "Peer education initiatives",
            "Teacher training workshops"
          ]
        },
        "policy": {
          "title": "Policy Measures",
          "description": "Government policies and legal framework to combat drug abuse",
          "points": [
            "Strict law enforcement",
            "Inter-state coordination",
            "International cooperation"
          ],
          "drugPrevention": "Drug Prevention Measures",
          "ncord": "NCord",
          "taskforce": "Anti-drug Task Force",
          "ndps": "NDPS Act"
        }
      },
      "impact": {
        "title": "Our Impact",
        "centers": {
          "number": "20+",
          "label": "Rehabilitation Centers"
        },
        "lives": {
          "number": "500+",
          "label": "Lives Transformed"
        },
        "districts": {
          "number": "10+",
          "label": "Districts Covered"
        }
      }
    },

    // Common
    "common": {
      "loading": "Loading...",
      "error": "An error occurred",
      "success": "Success",
      "submit": "Submit",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete",
      "edit": "Edit",
      "view": "View",
      "search": "Search",
      "filter": "Filter",
      "sort": "Sort",
      "next": "Next",
      "previous": "Previous",
      "goToHomepage": "Go to Homepage",
      "confirmDelete": "Are you sure you want to delete this item?",
      "document": "Document",
      "download": "Download",
      "in": "in",
      // Locations
      "locations": {
        "sangli": "Sangli"
      },
      // Page titles
      "titles": {
        "login": "Login - Sangli",
        "register": "Register - Sangli",
        "dashboard": "Dashboard - Sangli",
        "events": "Events - Sangli",
        "initiatives": "Initiatives - Sangli",
        "effects": "Effects - Sangli",
        "directory": "Directory - Sangli",
        "helpline": "Helpline - Sangli"
      }
    },

    // Error Pages
    "error": {
      "notFound": {
        "title": "404",
        "heading": "Page Not Found",
        "message": "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable"
      }
    },

    // Events Page
    "events": {
      "title": "Events",
      "upcoming": "Upcoming Events",
      "past": "Past Events",
      "register": "Register for Event",
      "registerFor": "Register for",
      "details": "Event Details",
      "location": "Location",
      "date": "Date",
      "time": "Time",
      "allEvents": "All Events",
      "myEvents": "My Events",
      "backToEvents": "Back to Events",
      "eventNotFound": "Event not found. The event may have been removed or relocated.",
      "error": "Failed to load events",
      "noEvents": "No events found",
      "noEventsSearch": "No events found matching your search",
      "searchLabel": "Search Events",
      "searchPlaceholder": "Search by title or description...",
      "districtLabel": "Filter by District",
      "allDistricts": "All Districts",
      "learnMore": "Learn More",
      "viewDetails": "View Details",
      "previousPage": "Previous",
      "nextPage": "Next",
      "createEvent": "Create New Event",
      "eventTitle": "Event Title",
      "description": "Description",
      "district": "District",
      "eventDate": "Event Date",
      "eventImages": "Event Images",
      "uploadImages": "Upload Images",
      "eventReports": "Event Reports",
      "uploadReports": "Upload Reports",
      "remove": "Remove",
      "myEventsDescription": "Manage your created events and view registrations",
      "upcomingDescription": "Discover upcoming events and activities in your area",
      "pastDescription": "View past events and their outcomes",
      "registrationsCount": "Registrations",
      "showRegistrations": "Show Registrations",
      "registrationsFor": "Registrations for",
      "createdBy": "Created by",
      "unknownCreator": "Unknown",
      "event": "Event",
      "organizedBy": "Organized by",
      "eventPhotos": "Event Photos",
      "eventDocuments": "Event Documents",
      "eventPhoto": "Event Photo",
      "validation": {
        "titleRequired": "Title is required",
        "descriptionRequired": "Description is required",
        "locationRequired": "Location is required",
        "districtRequired": "District is required",
        "dateRequired": "Valid date is required"
      }
    },

    // Authentication
    "auth": {
      "login": {
        "title": "Login",
        "emailLabel": "Email Address",
        "passwordLabel": "Password",
        "loginButton": "Login",
        "loggingIn": "Logging in...",
        "noAccount": "Don't have an account?",
        "error": "Login failed. Please check your credentials."
      },
      "register": {
        "title": "Register",
        "nameLabel": "Name",
        "emailLabel": "Email Address",
        "passwordLabel": "Password",
        "roleLabel": "Role",
        "districtLabel": "District",
        "registerButton": "Register",
        "registering": "Registering...",
        "hasAccount": "Already have an account?",
        "roles": {
          "public": "Public",
          "blockOfficer": "Block Officer"
        }
      }
    },

    // Effects Page
    effects: {
      title: 'Effects of Substance Abuse',
      subtitle: 'Understanding the physical, social, and mental impacts of drug abuse',
      physical: {
        title: 'Physical Effects',
        description: 'Drug abuse can have severe impacts on various body systems, according to the World Health Organization (WHO) and Ministry of Health and Family Welfare, Government of India. These effects can be both immediate and long-term.',
        points: [
          'Long-term health issues: Cardiovascular disease, liver cirrhosis, and respiratory disorders (Source: WHO Global Status Report on Alcohol and Health, 2018)',
          'Weakened immune system: Reduced ability to fight infections and diseases (Source: National Institute on Drug Abuse, USA)',
          'Organ damage: Liver cirrhosis, heart disease, and lung damage are common (Source: Indian Journal of Medical Research)',
          'Increased disease risk: Higher susceptibility to HIV, Hepatitis B & C (Source: National AIDS Control Organization, India)'
        ]
      },
      social: {
        title: 'Social Effects',
        description: 'Substance abuse significantly impacts social relationships and community well-being.',
        points: [
          'Family disruption: Strained relationships and domestic issues (Source: Ministry of Social Justice and Empowerment)',
          'Workplace problems: Reduced productivity and increased accidents (Source: National Drug Dependence Treatment Centre)',
          'Financial strain: Economic burden on families and communities (Source: Social Welfare Department)',
          'Social isolation: Breakdown of social relationships and support networks (Source: Indian Council of Medical Research)'
        ]
      },
      mental: {
        title: 'Mental Health Effects',
        description: 'Drug abuse can lead to significant psychological and cognitive impairments.',
        points: [
          'Depression and anxiety: Increased risk of mental health disorders (Source: National Mental Health Survey)',
          'Cognitive decline: Memory loss and reduced cognitive function (Source: AIIMS Research Studies)',
          'Behavioral changes: Aggression, paranoia, and mood swings (Source: Psychiatric Association of India)',
          'Addiction cycle: Compulsive drug-seeking behavior despite negative consequences (Source: National Institute of Mental Health)'
        ]
      }
    },
    
    // Footer Translations
    footer: {
      description: "Empowering individuals and communities through education, support, and rehabilitation for addiction recovery.",
      quickLinks: "Quick Links",
      contact: "Contact",
      copyright: "All Rights Reserved",
      aboutUs: "About Us",
      mission: "Our Mission",
      team: "Team",
      testimonials: "Testimonials",
      careers: "Careers",
      resources: "Resources",
      articles: "Articles",
      videos: "Videos",
      supportGroups: "Support Groups",
      recoveryPrograms: "Recovery Programs",
      getHelp: "Get Help",
      helpline: "Helpline",
      treatmentCenters: "Treatment Centers",
      faqs: "FAQs",
      contactUs: "Contact Us",
      emailPlaceholder: "Your email",
      subscribe: "Subscribe",
      privacy: "Privacy",
      terms: "Terms",
      sitemap: "Sitemap"
    },

    // Directory page translations
    "directory": {
      "title": "Rehabilitation Centers & NGO Directory - Sangli",
      "subtitle": "Connect with organizations working towards addiction prevention and rehabilitation",
      "srNo": "Sr. No.",
      "organizationName": "Organization Name",
      "address": "Address",
      "contact": "Contact Details",
      "searchPlaceholder": "Search for organizations...",
      "noResults": "No organizations found matching your search criteria",
      "description": "Below is a comprehensive directory of government-approved rehabilitation centers and NGOs in Sangli that provide addiction treatment and support services."
    },

    // Helpline page translations
    "helpline": {
      "title": "24/7 De-addiction Helpline Services",
      "subtitle": "Get immediate assistance and support for addiction-related issues",
      "description": "Our helpline services provide confidential support, guidance, and resources for individuals and families affected by substance abuse.",
      "emergencyContacts": "Emergency Contacts",
      "hours": {
        "title": "Service Hours",
        "description": "Our helplines are available 24 hours a day, 7 days a week, including holidays. Trained professionals are always ready to assist you."
      },
      "languages": {
        "title": "Available Languages",
        "description": "Support is available in English, Hindi, Marathi, and other regional languages to ensure effective communication."
      },
      "confidentiality": {
        "title": "Confidentiality Guarantee",
        "text": "All calls and communications are strictly confidential. Your privacy is our priority, and personal information will not be shared without your consent."
      },
      "services": {
        "emergency": {
          "title": "Emergency Helpline",
          "description": "Immediate support for crisis situations and emergencies related to substance abuse",
          "action": "Call Now"
        },
        "whatsapp": {
          "title": "WhatsApp Support",
          "description": "Send messages for guidance, information, and support through WhatsApp",
          "action": "Message Us"
        },
        "email": {
          "title": "Email Assistance",
          "description": "Write to us for detailed information and non-urgent support",
          "action": "Email Us"
        },
        "counseling": {
          "title": "Professional Counseling",
          "description": "Schedule consultations with addiction specialists and counselors",
          "action": "Book Session"
        }
      },
      "contactLabels": {
        "deaddiction": "Drug De-addiction Helpline",
        "national": "National Toll-Free Drug De-addiction Helpline",
        "police": "Police Control Room",
        "ambulance": "Ambulance"
      }
    }
  },
  mr: mr
}; 