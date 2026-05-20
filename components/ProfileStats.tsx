import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useAppTheme } from './ThemeContext';

interface StatItem {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}

interface ProfileStatsProps {
  stats: StatItem[];
}

const ProfileStats = memo<ProfileStatsProps>(({ stats }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View 
          key={index}
          style={[
            styles.statItem,
            { 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }
          ]}
        >
          <View style={styles.statIcon}>
            <Ionicons 
              name={stat.icon as any} 
              size={24} 
              color={stat.color || colors.primary} 
            />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stat.value}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text + '80' }]}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});

ProfileStats.displayName = 'ProfileStats';

export default ProfileStats;


