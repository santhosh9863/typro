import React from 'react';
import Key from '@/components/keyboard/Key';
import SpecialKey from '@/components/keyboard/SpecialKey';
import { KeyDefinition } from '@/lib/constants';

interface KeyRowProps {
    keys: KeyDefinition[];
    activeKeys: string[];
    rgbMode?: boolean;
    predictedKey?: string | null;
}

export default function KeyRow({ keys, activeKeys, rgbMode = false, predictedKey = null }: KeyRowProps) {
    return (
        <div className="flex flex-row justify-center items-center gap-1.5 sm:gap-2 md:gap-3 w-full">
            {keys.map((keyObj, index) => {
                const isPressed = activeKeys.some(
                    (activeKey) => activeKey.toLowerCase() === keyObj.value.toLowerCase()
                );

                const isPredicted = predictedKey !== null && keyObj.value.toLowerCase() === predictedKey.toLowerCase();

                if (keyObj.type === 'special') {
                    return (
                        <SpecialKey
                            key={`${keyObj.value}-${index}`}
                            label={keyObj.label}
                            isPressed={isPressed}
                            width={keyObj.width}
                            rgbMode={rgbMode}
                        />
                    );
                }

                return (
                    <Key
                        key={`${keyObj.value}-${index}`}
                        label={keyObj.label}
                        isPressed={isPressed}
                        width={keyObj.width}
                        isPredicted={isPredicted}
                        rgbMode={rgbMode}
                    />
                );
            })}
        </div>
    );
}
