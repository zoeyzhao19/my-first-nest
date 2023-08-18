import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"
import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedRole1692170998496 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.startTransaction()
        const collection = queryRunner.databaseConnection.db().collection('roles')
        const role= await collection.findOne({})
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
        await collection.insertMany(roleSeed)
        await queryRunner.commitTransaction()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
