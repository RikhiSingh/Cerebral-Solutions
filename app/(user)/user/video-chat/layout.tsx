import ClientProvider from "../_components/client-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
    <ClientProvider >
        {children}
    </ClientProvider>
    );
}

export default Layout;