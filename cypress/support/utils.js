import { faker } from '@faker-js/faker'


export function generateUserData() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: faker.internet.password()
    }
}