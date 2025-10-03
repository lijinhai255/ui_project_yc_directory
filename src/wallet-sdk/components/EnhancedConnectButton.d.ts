import React from 'react';
interface EnhancedConnectButtonProps {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    showBalance?: boolean;
    showChainSwitcher?: boolean;
    onConnect?: (result: {
        success: boolean;
        error?: string;
    }) => void;
    onDisconnect?: () => void;
}
declare const EnhancedConnectButton: React.FC<EnhancedConnectButtonProps>;
export default EnhancedConnectButton;
//# sourceMappingURL=EnhancedConnectButton.d.ts.map