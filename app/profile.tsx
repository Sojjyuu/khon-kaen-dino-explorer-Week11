import { Stack } from 'expo-router';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';

const profileImage = require('../assets/profile-oc.png');

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackTitle: 'กลับ',
        }}
      />

      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={profileImage}
            imageStyle={styles.coverImage}
            style={styles.cover}
          >
            <View style={styles.coverShade} />
            <View style={styles.coverContent}>
              <View style={styles.departmentPill}>
                <Text style={styles.departmentPillText}>CIS</Text>
              </View>
              <Text style={styles.coverEyebrow}>STUDENT PROFILE</Text>
              <Text style={styles.coverTitle}>ผู้พัฒนาแอป</Text>
              <Text style={styles.coverSubtitle}>Khon Kaen Dino Explorer</Text>
            </View>
          </ImageBackground>

          <View style={styles.profileCard}>
            <View style={styles.identityRow}>
              <Image source={profileImage} style={styles.avatar} />
              <View style={styles.identityText}>
                <Text style={styles.name}>ชื่อ - นามสกุล</Text>
                <Text style={styles.role}>Student Developer</Text>
                <Text style={styles.program}>วิทยาการคอมพิวเตอร์และสารสนเทศ</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ชื่อ - นามสกุล</Text>
                <Text style={styles.infoValue}>Kirati Suwanpusit</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>รหัสนักศึกษา</Text>
                <Text style={styles.infoValue}>663450172-5</Text>
              </View>

              <View style={styles.infoItemLast}>
                <Text style={styles.infoLabel}>สาขา</Text>
                <Text style={styles.infoValue}>วิทยาการคอมพิวเตอร์และสารสนเทศ</Text>
              </View>
            </View>
          </View>

          <View style={styles.projectCard}>
            <View style={styles.projectAccent} />
            <View style={styles.projectCopy}>
              <Text style={styles.projectLabel}>FINAL PROJECT</Text>
              <Text style={styles.projectTitle}>Khon Kaen Dino Explorer</Text>
              <Text style={styles.projectDescription}>
                แอปสำหรับสำรวจสถานที่น่าสนใจในขอนแก่น พร้อมแผนที่ ทริปส่วนตัว กล้อง และระบบแจ้งเตือนกิจกรรม
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  cover: {
    height: 300,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: colors.navy,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 9,
  },
  coverImage: {
    resizeMode: 'cover',
  },
  coverShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 18, 40, 0.28)',
  },
  coverContent: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: 'rgba(4, 18, 40, 0.68)',
  },
  departmentPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: colors.gold,
    paddingHorizontal: 11,
    paddingVertical: 6,
    marginBottom: 10,
  },
  departmentPillText: {
    color: colors.navy,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  coverEyebrow: {
    color: '#D9E4F3',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  coverTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '900',
    marginTop: 3,
  },
  coverSubtitle: {
    color: '#D6E0EE',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  profileCard: {
    marginTop: 18,
    borderRadius: 28,
    backgroundColor: colors.navy,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(243,185,40,0.3)',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 7,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: '#17315A',
  },
  identityText: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '900',
  },
  role: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  program: {
    color: '#BBC9DD',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: 18,
  },
  infoGrid: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  infoItem: {
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9EDF3',
  },
  infoItemLast: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  infoLabel: {
    color: colors.goldDark,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  infoValue: {
    color: colors.navy,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '800',
    marginTop: 5,
  },
  projectCard: {
    flexDirection: 'row',
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7DFCD',
    overflow: 'hidden',
  },
  projectAccent: {
    width: 7,
    backgroundColor: colors.gold,
  },
  projectCopy: {
    flex: 1,
    padding: 18,
  },
  projectLabel: {
    color: colors.goldDark,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  projectTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  projectDescription: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
  },
});
