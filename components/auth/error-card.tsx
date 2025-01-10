import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel=""
            backButtoHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex justify-center bg-destructive/15 p-3 rounded-md items-center">
                <ExclamationTriangleIcon className="h-8 w-8 mr-4 text-destructive" />
                <p className="text-destructive">Something went wrong. <br /> Please go back and try again.</p>
            </div>
        </CardWrapper>
    )
}