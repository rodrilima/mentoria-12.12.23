import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Page() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  async function excluir(data: FormData) {
    "use server";

    await prisma.product.delete({
      where: {
        id: Number(data.get("id")),
      },
    });

    revalidatePath("/produtos");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Produtos</h1>
        <Link className="btn btn-primary" href="/produtos/novo">
          Novo
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>R$ {product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category.name}</td>
              <td>
                <form action={excluir}>
                  <input type="hidden" name="id" value={product.id} />
                  <button>Excluir</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
