import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"
import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedRole1692170998496 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.startTransaction()

        const role_collection = queryRunner.databaseConnection.db().collection('roles')
        const role= await role_collection.findOne({})
        if(!role) {
            const roleSeed = [
                {
                    name: '管理员',
                    permissions: []
                },
                {
                    name: '普通用户',
                    permissions: []
                }
            ]
        await role_collection.insertMany(roleSeed)

        const room_collection = queryRunner.databaseConnection.db().collection('rooms')
        const room = await room_collection.findOne({})
        if(!room) {
            const roomSeed = [
                {
                    name: '会议室1',
                    state: {
                        status: 'available'
                    }
                },
                {
                    name: '会议室2',
                    state: {
                        status: 'available'
                    }
                }
            ]
            await room_collection.insertMany(roomSeed)
        }

        await queryRunner.commitTransaction()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
