import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1976D2',
  },
  eventInfo: {
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
  },
  statusCell: {
    width: '15%',
    padding: 8,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
});

const RegistrationsPDF = ({ event, registrations }) => (
  <PDFViewer style={{ width: '100%', height: '600px' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Event Registrations</Text>
        
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
          <Text>Location: {event.location}</Text>
          <Text>Total Registrations: {registrations.length}</Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Contact</Text>
            <Text style={styles.tableCell}>Address</Text>
            <Text style={styles.tableCell}>District</Text>
            <Text style={styles.statusCell}>Status</Text>
          </View>

          {/* Table Body */}
          {registrations.map((reg, index) => (
            <View key={reg._id} style={[styles.tableRow, index % 2 === 0 ? { backgroundColor: '#f9f9f9' } : {}]}>
              <Text style={styles.tableCell}>{reg.name}</Text>
              <Text style={styles.tableCell}>{`${reg.phone}\n${reg.email}`}</Text>
              <Text style={styles.tableCell}>{reg.address}</Text>
              <Text style={styles.tableCell}>{`${reg.district}\n${reg.taluka}, ${reg.village}`}</Text>
              <Text style={[styles.statusCell, { color: reg.status === 'approved' ? '#4caf50' : reg.status === 'rejected' ? '#f44336' : '#ff9800' }]}>
                {reg.status.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleString()} • NashaMukti Event Management System
        </Text>
      </Page>
    </Document>
  </PDFViewer>
);

export default RegistrationsPDF; 