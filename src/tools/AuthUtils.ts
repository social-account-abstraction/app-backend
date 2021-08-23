import jwt from 'jsonwebtoken';
import config from '../config/config';
import bcrypt from 'bcrypt';
import topMostCommonPasswords from './topMostCommonPasswords.json';
import Validate from 'validate.js';
import _ from 'lodash';

export type SecureJwtUser = {
    id: number,
    email: string
}

export class AuthUtils {
    static createJwtToken(user: SecureJwtUser): string {
        const safeUser: SecureJwtUser = {
            id: user.id,
            email: user.email
        };
        return jwt.sign(safeUser, config.server.jwtSecret, {expiresIn: config.server.jwtExpiresIn, algorithm: 'HS512'});
    }

    static async decodeJwtToken(token: string): Promise<SecureJwtUser> {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jwt.verify(token, config.server.jwtSecret, (err, decoded: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        id: decoded.id,
                        email: decoded.email
                    });
                }
            });
        });
    }

    static async hash(text: string): Promise<string> {
        const SALT_ROUNDS = 10;
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, SALT_ROUNDS, (err: Error | undefined, hash: string) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    }

    static async checkHash(params: { hash: string, text: string }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(params.text, params.hash, (err: Error | undefined, result: boolean) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    static validateEmailPassword(params: { email: string, password: string }): string | null {
        const constraints = {
            email: {
                email: true
            },
            password: {
                presence: {
                    allowEmpty: false
                },
                length: {
                    minimum: 6,
                    maximum: 256
                },
                exclusion: {
                    within: topMostCommonPasswords,
                    message: 'Password is too simple'
                }
            }
        };
        Validate.validators.noSpaces = (value: string): string | null => {
            const illegalChars = /\W/; // allow letters, numbers, and underscores
            if (illegalChars.test(value)) {
                return 'has illegal chars';
            } else {
                return null;
            }
        };
        const valid = Validate.validate(params, constraints);
        if (valid) {
            if (valid.email) {
                return valid.email.join(', ');
            }
            if (valid.password) {
                return valid.password.join(', ');
            }
        }
        return null;
    }

    // eslint-disable-next-line no-magic-numbers
    static generateOneTimeCode(size = 6): string {
        // eslint-disable-next-line no-magic-numbers
        return _.random(Math.pow(10, size - 1), Math.pow(10, size) - 1, false).toString();
    }
}
