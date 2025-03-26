import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {Asset, Liability} from '../../model/types';
import {AppText} from '../../components/AppText';
import i18n from '../../locales/i18n';

export type Props = {
  item: Asset | Liability;
  isAsset: boolean;
  value: number;
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundSecondary,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    borderRadius: 14,
  },
  nameContainer: {flexDirection: 'row', alignItems: 'center'},
  image: {
    height: 32,
    width: 32,
    marginRight: theme.spacing.m,
  },
}));

export const FinanceListItem = ({item, isAsset, value}: Props) => {
  const name = isAsset
    ? (item as Asset)[`name_${i18n.language}` as keyof Asset]
    : (item as Liability).name;
  const icon = isAsset
    ? require('./img/icon_asset.png')
    : require('./img/icon_liability.png');
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image style={styles.image} source={icon} />
        <AppText size="body2" weight="semiBold">
          {name?.toString()}
        </AppText>
      </View>
      <AppText size="body2" weight="semiBold">
        {value.toLocaleString(undefined, {maximumFractionDigits: 0})}
      </AppText>
    </View>
  );
};
