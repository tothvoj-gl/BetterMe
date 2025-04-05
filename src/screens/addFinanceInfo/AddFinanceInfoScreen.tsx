import {FlatList, Text, View} from 'react-native';
import {AppButton} from '../../components/AppButton';
import {StyleSheet} from 'react-native-unistyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppText} from '../../components/AppText';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'flex-end',
    width: '100%',
  },
  text: {
    marginTop: 100,
    fontFamily: 'DMSans-Regular',
  },
}));

export const AddFinanceInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={['ds', 'dsd']}
        renderItem={item => (
          <View style={{width: '100%', backgroundColor: 'blue'}}>
            <AppText>{item.item}</AppText>
          </View>
        )}
        style={{flex: 1, backgroundColor: 'red'}}
        contentContainerStyle={{flex: 1, backgroundColor: 'green'}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
