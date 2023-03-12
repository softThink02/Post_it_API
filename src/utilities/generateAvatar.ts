import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

export const generateAvatar = () => {
    const avatar = createAvatar(lorelei, {
        seed: 'John Doe',
        // ... other options
    });

    const svg = avatar.toString();
    console.log(svg)
}
