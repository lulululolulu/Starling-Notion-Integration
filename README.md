# Starling-Notion-Integration

Starling-Notion-Integration integrates Starling Bank's API with Notion to fetch transactions from Starling Bank and upload them as pages in Notion databases. I created this to track my personal finance.


## Getting API Tokens

- Log in to https://developer.starlingbank.com/ to get a Starling Bank API access token.
- Go to https://www.notion.so/my-integrations to build an internal integration and get a Notion API key.
- Follow this link https://developers.notion.com/reference/retrieve-a-database to get your notion database id.

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/lulululolulu/Starling-Notion-Integration
   cd Starling-Notion-Integration
   ```

2. **Install dependencies:**
    ``` 
    npm install
    ```

3. **Set up environment variables:**
    <br>Create a .env file in the root directory and fill it with your credentials. For example:

    ```
    STARLING_TOKEN=your_starling_api_token_here
    NOTION_API_KEY=your_notion_api_key_here
    NOTION_DATABASE_ID=your_notion_database_id_here
    NOTION_INCOME_DATABASE_ID=your_notion_income_database_id_optional_here (use the same database id if you don't want income to be stored separately)
    ```

## Configuration

- **Starling API**: It uses the `STARLING_TOKEN` to authenticate requests with Starling Bank's API.
- **Notion API**:
  - **API Key**: Transactions are uploaded using the `NOTION_API_KEY`.
  - **Database ID**: The `NOTION_DATABASE_ID` specifies the Notion database where transactions should be saved.
  - **Income Database ID**: Use the `NOTION_INCOME_DATABASE_ID` if transactions need to be categorized into a separate database specifically for income.
