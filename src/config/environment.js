export default{
    port: parseInt(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || 'production',
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '90c743d82a4348d0ce0e26ba7e93c47950dcecba93be0bb9abe99b3b874250ca', // crypto.randomBytes(32).toString("hex")
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '392a36408ff84ca610380492d65c6549963298b5d8b567ba4ed22ad0593f425f'
}