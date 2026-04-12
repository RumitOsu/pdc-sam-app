# pdc-sam-app

Serverless application built during the **Complete AWS SAM** workshop. Creates a DynamoDB-backed REST API with three Lambda handlers (`get-all-items`, `get-by-id`, `put-item`), blue/green deployment through CodeDeploy, and a GitHub Actions CI/CD pipeline that lints, tests, and validates the stack on every push to `main`.

## Stack

- AWS SAM (Serverless Application Model)
- Node.js 20.x (ES modules)
- DynamoDB (single-table)
- API Gateway (REST)
- CodeDeploy (canary deployments: `Canary10Percent5Minutes`)
- GitHub Actions (CI/CD)

## Layout

```
.
├── .github/workflows/pipeline.yml   GitHub Actions: test + sam build
├── __tests__/unit/handlers/         Jest unit tests
├── events/                          Sample API Gateway events
├── src/handlers/                    Lambda handler source
├── samconfig.toml                   sam deploy defaults
├── template.yaml                    SAM infrastructure template
└── package.json
```

## Run locally

```bash
npm install
npm test
sam build
sam local invoke getAllItemsFunction -e events/event-get-all-items.json
```

## Deploy

```bash
sam deploy --guided
```

Canary deployments shift 10% of traffic to the new version, wait 5 minutes, then shift the remainder. Failed CloudWatch alarms trigger automatic rollback.
