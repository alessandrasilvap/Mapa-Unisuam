import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppTheme } from './ThemeContext';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
  onHeaderPress?: () => void;
  showChevron?: boolean;
}

const ProfileSection = memo<ProfileSectionProps>(({
  title,
  children,
  icon,
  onHeaderPress,
  showChevron = false,
}) => {
  const { colors } = useAppTheme();

  const HeaderComponent = onHeaderPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <HeaderComponent
        style={styles.header}
        onPress={onHeaderPress}
        disabled={!onHeaderPress}
      >
        <View style={styles.headerLeft}>
          {icon && (
            <Ionicons 
              name={icon as any} 
              size={20} 
              color={colors.primary} 
              style={styles.headerIcon}
            />
          )}
          <Text style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>
        </View>
        {showChevron && onHeaderPress && (
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={colors.text + '60'} 
          />
        )}
      </HeaderComponent>
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

ProfileSection.displayName = 'ProfileSection';

export default ProfileSection;


