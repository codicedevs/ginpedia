import { Button, Div, Overlay, Text } from "react-native-magnus";
import { scale } from "react-native-size-matters";
import { TitleGenerator } from "../../utils/text";
import { customTheme } from "../../utils/theme";

interface ConfirmationModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    declineText?: string;
    title: string;
    subTitle: string
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isVisible, onConfirm, onCancel, confirmText = 'Confirmar', declineText, title, subTitle }) => {
    return (
        <Overlay visible={isVisible} p={customTheme.spacing.medium} h={scale(200)} >
            <Div flex={1} alignItems="flex-start" justifyContent="center" >
                <TitleGenerator color="black" title={title} />
                <Text color="black" mt={scale(5)} fontSize='sm'>{subTitle}</Text>
            </Div>
            <Div flex={1} justifyContent="space-around" flexDir="row">
                <Button
                    alignSelf="center"
                    onPress={onConfirm}
                    bg="yellow600"
                    color="white"
                    w={'100%'}
                >
                    <Text color="black" fontSize='lg'>{confirmText}</Text>
                </Button>
                {
                    declineText &&
                    <Button
                        bg="red500"
                        color="white"
                        underlayColor="red600" alignSelf="center"
                        onPress={onCancel}
                    >
                        <Text color="white" fontSize='sm'>{declineText}</Text>
                    </Button>
                }
            </Div>
        </Overlay>
    )
}