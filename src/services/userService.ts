import { db } from '@/lib/db';

class UserService {
    async getUser(username: string) {
        const user = await db.user.findUnique({
            where: {
                username
            },
        });

        return user;
    };
}

export const userService = new UserService();