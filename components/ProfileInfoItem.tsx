import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppTheme } from './ThemeContext';

interface ProfileInfoItemProps {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void;
  editable?: boolean;
  placeholder?: string;
}

const ProfileInfoItem = memo<ProfileInfoItemProps>(({
  icon,
  label,
  value,
  onPress,
  editable = false,
  placeholder = 'Não informado',
}) => {
  const { colors } = useAppTheme();

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.container, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={colors.primary} 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.text + '80' }]}>
          {label}
        </Text>
        <Text 
          style={[
            styles.value, 
            { 
              color: value ? colors.text : colors.text + '60',
              fontStyle: value ? 'normal' : 'italic'
            }
          ]}
          numberOfLines={2}
        >
          {value || placeholder}
        </Text>
      </View>
      
      {editable && (
        <Ionicons 
          name="create-outline" 
          size={18} 
          color={colors.primary + '80'} 
        />
      )}
    </Component>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
});

ProfileInfoItem.displayName = 'ProfileInfoItem';

export default ProfileInfoItem;


