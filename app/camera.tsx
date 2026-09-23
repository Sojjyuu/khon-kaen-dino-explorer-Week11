import { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';
import { captureRef } from 'react-native-view-shot';
import { colors } from '../src/theme/colors';

const filters = [
  { name: 'ธรรมชาติ', tint: 'transparent' },
  { name: 'อบอุ่น', tint: 'rgba(244, 158, 67, 0.22)' },
  { name: 'เย็น', tint: 'rgba(61, 144, 220, 0.20)' },
  { name: 'วินเทจ', tint: 'rgba(158, 111, 54, 0.28)' },
] as const;

export default function CameraScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [filterIndex, setFilterIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const previewRef = useRef<View>(null);
  const [message, setMessage] = useState('ถ่ายรูปสถานที่ หรือเลือกรูปจากคลังภาพ');

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setMessage('ไม่ได้รับสิทธิ์ใช้กล้อง กรุณาอนุญาต Camera permission แล้วลองอีกครั้ง');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
      setFilterIndex(0);
      setMessage('ถ่ายแล้ว เลือกโทนภาพและกดบันทึกลงเครื่อง');
    }
  };

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setMessage('ไม่ได้รับสิทธิ์เข้าถึงรูปภาพ กรุณาอนุญาต Photo Library permission');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
      setFilterIndex(0);
      setMessage('เลือกรูปเรียบร้อย');
    }
  };

  const savePhoto = async () => {
    if (!imageUri || !previewRef.current || saving) return;
    setSaving(true);
    try {
      const permission = await MediaLibrary.requestPermissionsAsync(true);
      if (!permission.granted) {
        setMessage('ยังไม่ได้อนุญาตให้บันทึกรูปลงเครื่อง');
        return;
      }
      // Capture the image and its selected color overlay together.
      const uri = await captureRef(previewRef, { format: 'jpg', quality: 0.95, result: 'tmpfile' });
      await MediaLibrary.saveToLibraryAsync(uri);
      setMessage(`บันทึกภาพโทน${filters[filterIndex].name}ลงคลังรูปแล้ว`);
    } catch (error) {
      setMessage(`บันทึกไม่สำเร็จ: ${error instanceof Error ? error.message : 'กรุณาลองอีกครั้ง'}`);
    } finally { setSaving(false); }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CAMERA ASSIGNMENT</Text>
          <Text style={styles.title}>ภาพบันทึกการเดินทาง</Text>
          <Text style={styles.subtitle}>ถ่ายภาพ เลือกโทนสี แล้วบันทึกลงคลังรูปของเครื่อง</Text>
        </View>

        <View ref={previewRef} collapsable={false} style={styles.preview}>
          {imageUri ? (
            <><Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
              <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: filters[filterIndex].tint }]} /></>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>◎</Text>
              <Text style={styles.placeholderText}>ยังไม่มีรูป</Text>
            </View>
          )}
        </View>

        {imageUri && <View style={styles.filters}>{filters.map((filter, index) =>
          <Pressable key={filter.name} accessibilityRole="button" accessibilityState={{ selected: index === filterIndex }}
            onPress={() => setFilterIndex(index)} style={[styles.filterButton, index === filterIndex && styles.selectedFilter]}>
            <Text style={styles.filterText}>{filter.name}</Text>
          </Pressable>)}</View>}

        {imageUri && <Pressable accessibilityRole="button" disabled={saving} onPress={() => void savePhoto()} style={styles.saveButton}>
          <Text style={styles.primaryText}>{saving ? 'กำลังบันทึก…' : 'บันทึกภาพลงเครื่อง'}</Text>
        </Pressable>}

        <Text style={styles.message}>{message}</Text>

        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={takePhoto} style={styles.primaryButton}>
            <Text style={styles.primaryText}>เปิดกล้อง</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={pickPhoto} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>เลือกรูปจากเครื่อง</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 40 },
  header: { borderRadius: 28, backgroundColor: colors.navy, padding: 22 },
  eyebrow: { color: colors.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', marginTop: 5 },
  subtitle: { color: '#C8D3E4', fontSize: 12, lineHeight: 18, marginTop: 7 },
  preview: { height: 270, overflow: 'hidden', borderRadius: 28, backgroundColor: '#E8EDF3', marginTop: 16 },
  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderIcon: { color: colors.goldDark, fontSize: 54, fontWeight: '300' },
  placeholderText: { color: colors.textMuted, fontSize: 13, fontWeight: '800', marginTop: 8 },
  message: { color: colors.textMuted, fontSize: 11, lineHeight: 17, marginTop: 12, textAlign: 'center' },
  actions: { marginTop: 14 },
  primaryButton: { alignItems: 'center', borderRadius: 17, backgroundColor: colors.gold, paddingVertical: 14, marginTop: 10 },
  saveButton: { alignItems: 'center', borderRadius: 17, backgroundColor: colors.gold, paddingVertical: 16, marginTop: 12 },
  primaryText: { color: colors.navy, fontSize: 14, fontWeight: '900' },
  secondaryButton: { alignItems: 'center', borderRadius: 17, backgroundColor: colors.navy, paddingVertical: 14, marginTop: 10 },
  secondaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 7 },
  filterButton: { backgroundColor: colors.navy, paddingHorizontal: 11, paddingVertical: 10, borderRadius: 12 },
  selectedFilter: { backgroundColor: colors.gold },
  filterText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
});
