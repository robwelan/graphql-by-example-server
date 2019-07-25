const db = require('./db');

const Query = {
  company: (root, {id}) => db.companies.get(id),
  job: (root, {id}) => db.jobs.get(id),
  jobs: () => db.jobs.list()
};

const Mutation = {
  createJob: (root, {input}, context) => {
    if(!context.user) {
      throw new Error('Unauthorized');
    }

     const id = db.jobs.create({companyId: context.user.companyId, ...input});
     return db.jobs.get(id);
  }
};

const Company = {
  jobs: (company) => db.jobs.list()
    .filter((job) => job.companyId === company.id)
};

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

module.exports = { Mutation, Query, Company, Job };
