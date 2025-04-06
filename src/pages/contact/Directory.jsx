import React, { useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLanguage } from '../../context/LanguageContext';

const directoryData = {
  mr: [
    {
      id: 1,
      name: "श्री अष्ट़विनायक बहुउदेशीय सेवाभावी संस्था",
      address: "येवलेवाडी ता.वाळवा जि.सांगली",
      contact: "9021794006"
    },
    {
      id: 2,
      name: "आटपाडी तालुका ग्रामिण विकास सेस्था",
      address: "मु.पो. करगणी ता. आटपाडी जि. सांगली",
      contact: "9604013202, 9370017007"
    },
    {
      id: 3,
      name: "उमा चॅरिटेबल ट्रस्ट",
      address: "डॉ.शांताबाई आरळी हॉस्पीटल जवळ जत ता.जत जि सांगली",
      contact: "7721808999"
    },
    {
      id: 4,
      name: "जीवनदान बहुउद्देशीय सेवाभावी संस्था",
      address: "मु. पो. आसद ता.कडेगांव जि. सांगली",
      contact: "9665095650"
    },
    {
      id: 5,
      name: "नवजीवन मल्टीर्पपज चॅरिटेबल ट्रस्ट सांगली",
      address: "मु.पो, सातारा रोड एमआयडीसी जवळ ता.जत जि.सांगली",
      contact: "9881575918"
    },
    {
      id: 6,
      name: "नॅशनल इन्स्टीटयुट फॉर कम्युनिटी डेव्हलपमेंट अँड रिसर्च सांगली",
      address: "योजनाभवन कलानगर सांगली",
      contact: "8459504540"
    },
    {
      id: 7,
      name: "फुले आंबेडकर प्रतिष्ठान",
      address: "मु. पो. नागराळे ता.पलूस जि. सांगली",
      contact: "9975884119"
    },
    {
      id: 8,
      name: "बुध्दीस्ट डेव्हलमेंट रिसर्च टÒस्ट ऑफ इंडिया",
      address: "मु. पो .नागराळे ता.पलूस जि. सांगली",
      contact: "9975884119"
    },
    {
      id: 9,
      name: "लोकविकास प्रतिष्ठान पळशी",
      address: "शिवदर्शन कॉम्प्लेक्स खानापूर रोड विटा जि.सांगली",
      contact: "9604013202, 9370017007"
    },
    {
      id: 10,
      name: "श्री साई बहुउदेशीय सेवाभावी संस्था",
      address: "अष्टेकर प्लॉट नं.43 अभयनगर सांगली",
      contact: "9822552230"
    },
    {
      id: 11,
      name: "संवेदना फाउंडेशन सांगली",
      address: "C/O-रोनक रंजनीकांत शाह रा. फ्लॅट 301/302 तीसरा मजला सफायर अपार्टमेंट पाटीदार भवन जवळ सर्कीट हाउस एरीया महादेव बाग सांगली ता.मिरज जि.सांगली",
      contact: "9423001415"
    },
    {
      id: 12,
      name: "सहाय्यक सेवाभावी संस्था",
      address: "खटाव तालुका मिरज जिल्हा सांगली",
      contact: "9172365926"
    },
    {
      id: 13,
      name: "सोनाई ग्रामीण विकास प्रतिष्ठाण पाडळी",
      address: "मु.पो.पाडळी ता.शिराळा",
      contact: "7620722270"
    },
    {
      id: 14,
      name: "जनाधार प्रतिष्ठान बीड",
      address: "मु.पो.ता. जि.बीड",
      contact: ""
    },
    {
      id: 15,
      name: "दक्षिण भारत जैन सभा वीर सेवा दल मध्यवर्ती समीती",
      address: "37, महावीर नगर, सांगली",
      contact: "8007229329"
    },
    {
      id: 16,
      name: "निर्मल फाऊडेंशन",
      address: "गुरु अपार्टमेंट, जय हिंद कॉलनी, विश्रामबाग सांगली",
      contact: "9860540896"
    },
    {
      id: 17,
      name: "संजिवन शिक्षण व समाज विकास संस्था",
      address: "इस्लामपूर ता.वाळवा जि.सांगली",
      contact: "9270080018"
    }
  ],
  en: [
    {
      id: 1,
      name: "Shri Ashtavinayak Multi-Purpose Service Organization",
      address: "Yevalewadi, Tal. Walwa, Dist. Sangli",
      contact: "9021794006"
    },
    {
      id: 2,
      name: "Atpadi Taluka Rural Development Organization",
      address: "At Post Kargani, Tal. Atpadi, Dist. Sangli",
      contact: "9604013202, 9370017007"
    },
    {
      id: 3,
      name: "Uma Charitable Trust",
      address: "Near Dr. Shantabai Arali Hospital, Jath, Tal. Jath, Dist. Sangli",
      contact: "7721808999"
    },
    {
      id: 4,
      name: "Jeevandan Multi-Purpose Service Organization",
      address: "At Post Asad, Tal. Kadegaon, Dist. Sangli",
      contact: "9665095650"
    },
    {
      id: 5,
      name: "Navjeevan Multipurpose Charitable Trust Sangli",
      address: "At Post, Satara Road, Near MIDC, Tal. Jath, Dist. Sangli",
      contact: "9881575918"
    },
    {
      id: 6,
      name: "National Institute for Community Development and Research Sangli",
      address: "Yojana Bhavan, Kalanagar, Sangli",
      contact: "8459504540"
    },
    {
      id: 7,
      name: "Phule Ambedkar Foundation",
      address: "At Post Nagrale, Tal. Palus, Dist. Sangli",
      contact: "9975884119"
    },
    {
      id: 8,
      name: "Buddhist Development Research Trust of India",
      address: "At Post Nagrale, Tal. Palus, Dist. Sangli",
      contact: "9975884119"
    },
    {
      id: 9,
      name: "Lokvikas Foundation Palshi",
      address: "Shivadarshan Complex, Khanapur Road, Vita, Dist. Sangli",
      contact: "9604013202, 9370017007"
    },
    {
      id: 10,
      name: "Shri Sai Multi-Purpose Service Organization",
      address: "Ashtekar Plot No. 43, Abhaynagar, Sangli",
      contact: "9822552230"
    },
    {
      id: 11,
      name: "Samvedana Foundation Sangli",
      address: "C/O-Ronak Ranjanikant Shah, Flat 301/302, 3rd Floor, Saffire Apartment, Near Patidar Bhavan, Circuit House Area, Mahadev Bag, Sangli, Tal. Miraj, Dist. Sangli",
      contact: "9423001415"
    },
    {
      id: 12,
      name: "Sahayak Service Organization",
      address: "Khatav Taluka, Miraj, District Sangli",
      contact: "9172365926"
    },
    {
      id: 13,
      name: "Sonai Rural Development Foundation Padali",
      address: "At Post Padali, Tal. Shirala",
      contact: "7620722270"
    },
    {
      id: 14,
      name: "Janadhar Foundation Beed",
      address: "At Post Tal. Dist. Beed",
      contact: ""
    },
    {
      id: 15,
      name: "South India Jain Sabha Veer Seva Dal Central Committee",
      address: "37, Mahavir Nagar, Sangli",
      contact: "8007229329"
    },
    {
      id: 16,
      name: "Nirmal Foundation",
      address: "Guru Apartment, Jai Hind Colony, Vishrambag, Sangli",
      contact: "9860540896"
    },
    {
      id: 17,
      name: "Sanjivan Education and Social Development Organization",
      address: "Islampur, Tal. Walwa, Dist. Sangli",
      contact: "9270080018"
    }
  ]
};

const Directory = () => {
  const { language, translate } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const currentLanguageData = directoryData[language] || directoryData.en;

  const filteredData = currentLanguageData.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 2,
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        {translate('directory.title')}
      </Typography>

      <Typography 
        variant="h6" 
        align="center" 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        {translate('directory.subtitle')}
      </Typography>

      <Typography 
        variant="body1" 
        align="center" 
        sx={{ mb: 4 }}
      >
        {translate('directory.description')}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={translate('directory.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ 
            bgcolor: 'background.paper',
            '& .MuiOutlinedInput-root': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: 2,
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }
          }}
        />
      </Box>
      
      {filteredData.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {translate('directory.noResults')}
          </Typography>
        </Paper>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="directory table">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{translate('directory.srNo')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{translate('directory.organizationName')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{translate('directory.address')}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{translate('directory.contact')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow 
                  key={row.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Directory; 