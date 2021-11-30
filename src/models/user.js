import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import environment from '../config/environment'

export default (sequelize)=>{
    class User extends Model {
        static associate(models){
            User.RefreshToken = User.hasOne(models.RefreshToken) // creates one to one relationship
            User.Roles = User.hasMany(models.Role) //creates one to many relationship
        }
        
        static async hashPassword(password){
            return bcrypt.hash(password, environment.saltRounds)
        }

        static async createNewUser({email, password, roles, username, firstName, lastName, refreshToken}){
            sequelize.transaction(()=>{

                let rolesToSave =[]
                if (roles && Array.isArray(roles)){
                    rolesToSave = roles.map(role => {role})
                }


                return User.create({ email, password, username, firstName, lastName,
                                    refreshToken: {token: refreshToken},
                                    Roles: rolesToSave}, // {role:'admin', role:'customer'}
                    {include: [
                        User.RefreshToken,
                        User.Roles
                    ]
                }
                )
            })
        }

        async comparePassword(password){  // check alternative to prototype
            return bcrypt.compare(password, this.password)
        }

        }
        User.init({
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate:{
                    isEmail:{
                       msg: 'Not a valid email address' 
                    }
                }
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            username:{
                type: DataTypes.STRING(50),
                unique:true,
                validate:{
                    len:{
                        args:[2, 50],
                        msg: 'Username must container between 2 and 50 chars'
                    }
                }
            },
            firstName:{
                type: DataTypes.STRING(50),
                unique:true,
                validate:{
                    len:{
                        args:[3, 50],
                        msg: 'firstName must container between 3 and 50 chars'
                    }
                }
            },
            lastName:{
                type: DataTypes.STRING(50),
                unique:true,
                validate:{
                    len:{
                        args:[3, 50],
                        msg: 'lastName must container between 3 and 50 chars'
                    }
                }
            }
        },
        {
            sequelize, 
            modelName:'User',
            defaultScope: {attributes:{exclude:['password']}},
            scopes: {withPassword: {attributes:{include:['password']}}}
        })

    User.beforeSave(async(user,options)=>{
        const hashedPassword = await User.hashPassword(user.password)
        user.password = hashedPassword
    })

    User.afterCreate(user => delete user.dataValues.password)

    return User
}