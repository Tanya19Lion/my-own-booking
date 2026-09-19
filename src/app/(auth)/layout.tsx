type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="main-container relative">
            {children}
        </main>
    );
}
