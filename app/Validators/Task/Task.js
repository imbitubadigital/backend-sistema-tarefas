'use strict'
const { format, subDays, parseISO } = require('date-fns')

const dateStartCheck = format(subDays(new Date(), 1), 'yyyy-MM-dd')
const dateStartMsg = format(subDays(new Date(), 1), 'dd/MM/yyyy')
//  const dateEndCheck = format(new Date(), 'yyy-MM-dd')
//  const dateEndMsg = format(new Date(), 'dd/MM/yyyy')

class Task {
  get validateAll () {
    return true
  }

  get rules () {
    const start = this.ctx.request.body.task_start

    return {
      title: 'required',
      description: 'required',
      category_id: 'required',
      task_start: `required|after:${dateStartCheck}`,
      task_end: `required|after:${start}`
    }
  }

  get messages () {
    //  return Antl.forLocale('pt').list('validation')
    const startMsg = this.ctx.request.body.task_start
    return {
      'title.required': 'Informe o título da tarefa!',
      'description.required': 'Informe a descrição da tarefa!',
      'category_id.required': 'Informe a categoria da tarefa!',
      'task_start.required': 'Informe a data inicial da tarefa!',
      'task_start.after': `A data inicial da tarefa deve ser maior que ${dateStartMsg}!`,
      'task_end.required': 'Informe a data final da tarefa.',
      'task_end.after': `A data final da tarefa deve ser maior que ${format(parseISO(startMsg), 'dd/MM/yyyy')}!`
    }
  }
}

module.exports = Task
