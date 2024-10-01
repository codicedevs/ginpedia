import {
    DrawerItemList
} from '@react-navigation/drawer';
import { Div, Icon, Text } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { customTheme } from '../../utils/theme';

function CustomDrawerContent(props) {
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: customTheme.spacing.medium }}>
            {/* <DrawerContentScrollView style={{ flex: 1, height: '100%' }} {...props}> */}
            <Div flex={9} mt={'2xl'} >
                <DrawerItemList  {...props} />
            </Div>
            <Div flex={1}>
                <Div ml={scale(5)} row>
                    <Icon color='black' mr={scale(5)} fontFamily='MaterialIcons' name='logout' />
                    <Text color='black'>Cerrar sesion</Text>
                </Div>
            </Div>

            {/* </DrawerContentScrollView> */}
        </SafeAreaView>
    );
}

export default CustomDrawerContent