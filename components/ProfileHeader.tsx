import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAvatar } from '../hooks/useAvatar';
import { useAppTheme } from './ThemeContext';

const { width } = Dimensions.get('window');

interface ProfileHeaderProps {
  userName: string;
  userEmail: string;
  onEditPress: () => void;
  onPhotoPress: () => void;
}

const ProfileHeader = memo<ProfileHeaderProps>(({
  userName,
  userEmail,
  onEditPress,
  onPhotoPress,
}) => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { avatar } = useAvatar();

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      style={[styles.container, { paddingTop: insets.top + 20 }]}
    >
      <View style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onPhotoPress}
            activeOpacity={0.8}
          >
            {avatar ? (
              <Image source={avatar} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="person" size={50} color="#FFFFFF" />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {userEmail}
          </Text>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEditPress}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarSection: {
    marginRight: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;


