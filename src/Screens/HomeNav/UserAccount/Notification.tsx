import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HeadBack from '../../../CustomsComponents/BackWithTitle';

const Notification = () => {
    return (
        <View style={styles.container}>
            <HeadBack title="Notifications" showIcon={false} />
            <ScrollView contentContainerStyle={styles.notificationContainer}>
                <View style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>New Feature Released</Text>
                    <Text style={styles.notificationBody}>
                        We just released a new feature. Check it out now!
                    </Text>
                    <Text style={styles.notificationTime}>2 hours ago</Text>
                </View>

                <View style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>Update Available</Text>
                    <Text style={styles.notificationBody}>
                        A new app update is available. Please update your app to the latest version.
                    </Text>
                    <Text style={styles.notificationTime}>1 day ago</Text>
                </View>

                <View style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>Welcome to the App!</Text>
                    <Text style={styles.notificationBody}>
                        Thank you for joining us. We hope you enjoy using our app.
                    </Text>
                    <Text style={styles.notificationTime}>3 days ago</Text>
                </View>

                <View style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>Maintenance Notification</Text>
                    <Text style={styles.notificationBody}>
                        Our service will be undergoing maintenance tomorrow from 12:00 AM to 2:00 AM.
                    </Text>
                    <Text style={styles.notificationTime}>5 days ago</Text>
                </View>

                <View style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>Special Offer</Text>
                    <Text style={styles.notificationBody}>
                        Get 50% off on your next purchase. Offer valid for a limited time only.
                    </Text>
                    <Text style={styles.notificationTime}>1 week ago</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(255, 171, 0, 0.64)',
    },
    notificationContainer: {
        paddingBottom: 20,
    },
    notificationItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    notificationBody: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    notificationTime: {
        fontSize: 14,
        color: '#999',
    },
});

export default Notification;
