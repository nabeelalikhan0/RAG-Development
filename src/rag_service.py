# services/rag_service.py

from process_pdfs import process_all_pdfs, split_documents
from embeddings_manager import EmbeddingManager
from Vector_store import VectorStore
from RagRetriver import RAGRetriever
from RAG import rag_simple


class RAGService:

    def __init__(self):

        self.embedding_manager = EmbeddingManager()

        self.vector_store = VectorStore()

        self.retriever = RAGRetriever(
            self.vector_store,
            self.embedding_manager
        )

    def index_directory(self, directory):

        docs = process_all_pdfs(directory)

        chunks = split_documents(docs)

        embeddings = self.embedding_manager.generate_embeddings(
            [d.page_content for d in chunks]
        )

        self.vector_store.add_documents(
            chunks,
            embeddings
        )

    def ask(self, query):

        return rag_simple(
            query=query,
            retriever=self.retriever,
            llm=None
        )