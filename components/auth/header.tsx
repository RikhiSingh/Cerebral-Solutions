import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
    label: string
};

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <Link href="/">
                  <Image src={"/app-icons/logo.webp"} alt="Cerebral Solutions Logo" className='rounded-2xl' width={100} height={100}/>
            </Link>
            <p className="text-muted-foreground">
                {label}
            </p>
        </div>
    )
}