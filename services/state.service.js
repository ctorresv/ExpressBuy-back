import State from "../models/State.js";

const stateService = {
    state_create: async function (state, id) {
        const { application_id, type } = state
        console.log(state)
        try {
            let state_webhook = await State.create({ code_id: application_id, type: type, n_order: id })
            if (state_webhook) {
                return {
                    success: true,
                    status_code: 201,
                    state_webhook
                }
            } else {
                return {
                    success: false,
                    status_code: 400,
                    message: 'Failed to create the state, please try again'
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                status_code: 500,
                message: [{
                    path: 'Error',
                    message: 'Error internal server'
                }]
            }
        }

    }
}
export default stateService