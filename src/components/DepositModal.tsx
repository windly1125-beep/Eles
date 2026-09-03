import React, { useState } from 'react';
import { X, Copy, Check, ArrowDownToLine, ShieldCheck } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFunds: (amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onAddFunds
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number>(100);
  const walletAddress = 'TQ3a5gM...8vK9wZ2L4mX7rT';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFastDeposit = () => {
    onAddFunds(selectedPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-sm bg-[#17151B] border border-[#302B36] rounded-[22px] p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#302B36]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#AD50E8]/20 flex items-center justify-center text-[#AD50E8]">
              <ArrowDownToLine className="w-4 h-4" />
            </div>
            <h3 className="text-[16px] font-bold text-white">快捷充值 · USDT</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#29272C] text-[#AAA5B2] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Deposit Network */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-[12px] bg-[#111014] px-3 py-2 rounded-lg border border-[#29272C]">
            <span className="text-[#AAA5B2]">充值网络</span>
            <span className="text-white font-bold">TRC20 (波场网络)</span>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="text-[11px] text-[#787381] block mb-1">USDT 专属充值地址</label>
            <div className="flex items-center justify-between bg-[#111014] border border-[#302B36] rounded-xl px-3 py-2.5">
              <span className="text-[13px] font-mono text-[#AAA5B2] tracking-tight truncate mr-2">
                {walletAddress}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-bold text-[#AD50E8] hover:text-[#C060FF] cursor-pointer flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#55E68A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
            </div>
          </div>

          {/* Quick Sandbox Simulation */}
          <div className="pt-2">
            <label className="text-[11px] text-[#787381] block mb-1.5">模拟极速入账测试</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[50, 100, 500, 1000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSelectedPreset(val)}
                  className={`py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                    selectedPreset === val
                      ? 'bg-[#AD50E8] text-white shadow-md'
                      : 'bg-[#29272C] text-[#AAA5B2] hover:text-white'
                  }`}
                >
                  +{val}₮
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleFastDeposit}
              className="w-full h-[44px] rounded-full bg-[#AD50E8] hover:bg-[#C060FF] text-white font-bold text-[14px] shadow-[0_4px_16px_rgba(173,80,232,0.4)] active:scale-98 transition-all cursor-pointer"
            >
              模拟立即到账 {selectedPreset} USDT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
