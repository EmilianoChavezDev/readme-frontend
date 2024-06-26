"use client";
import "moment/locale/es";

import moment from "moment";
import toast from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";

import Modal from "@/components/common/modal";
import { useUser } from "@/contexts/UserProvider";
import useComment from "@/hooks/useComment";
import useDenuncias from "@/hooks/useDenuncias";
import Link from "next/link";
import ProfileView from "../common/ProfileView";

export default function xCommentsSection({ bookId }) {
  moment.locale("es");
  const COMMENTS_PAGE_SIZE = 5;
  const { username, profile } = useUser();
  const {
    getCommentsByUserAndBook,
    deleteComment,
    createComment,
    updateComment,
  } = useComment();

  const {
    getReportCommentCategory,
    createReportComment,
    error: ErrorDenuncia,
  } = useDenuncias();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({ list: [] });
  const [commentsListPage, setCommentsListPage] = useState(1);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [commentIdToRemove, setCommentIdToRemove] = useState(null);
  const [commentIdToReport, setCommentIdToReport] = useState(null);
  const [commentDescriptionToReport, setCommentDescriptionToReport] =
    useState("");
  const [commentSelectToReport, setCommentSelectToReport] = useState(null);
  const [categoryCommentReport, setCategoryCommentReport] = useState([]);
  const [errorCommentMotive, setErrorCommentMotive] = useState(false);

  const fetchComments = async () => {
    const data = await getCommentsByUserAndBook({
      libro_id: bookId,
      page: commentsListPage,
      size: COMMENTS_PAGE_SIZE,
    });
    const { resultado, cant_paginas } = data ?? {};
    let copiaDeComentarios = { ...comments };
    setComments({
      total_pages: cant_paginas,
      list: [...copiaDeComentarios.list, ...resultado],
    });
  };

  const addComment = async () => {
    await createComment({ libro_id: bookId, comentario: comment });
    const data = await getCommentsByUserAndBook({
      libro_id: bookId,
      page: 1,
      size: COMMENTS_PAGE_SIZE,
    });
    const { resultado, cant_paginas } = data ?? {};
    setCommentsListPage(1);
    setComments({ total_pages: cant_paginas, list: resultado });
    setComment("");
  };

  const handleCommentToUpdateChange = (value) => {
    let commentToEditCopy = { ...commentToEdit, comentario: value };
    setCommentToEdit(commentToEditCopy);
  };

  const handleUpdateComment = async () => {
    if (commentToEdit?.comentario?.trim()?.length) {
      const result = await updateComment(commentToEdit.id, {
        comentario: commentToEdit.comentario,
      });
      if (result?.comentario) {
        let commentsCopy = [...comments.list];
        let commentIndex = commentsCopy.findIndex(
          (c) => c.id === commentToEdit.id
        );
        commentsCopy[commentIndex] = {
          ...commentsCopy[commentIndex],
          comentario: commentToEdit.comentario,
        };
        setComments({ ...comments, list: commentsCopy });
      } else {
        toast.error("El comentario no pudo ser editado");
      }
    } else {
      toast.error("No se puede dejar un comentario en blanco");
    }
    setCommentToEdit(null);
  };

  const removeComment = async () => {
    const result = await deleteComment(commentIdToRemove);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Comentario eliminado correctamente");
      const indexComentario = comments?.list?.findIndex(
        (comment) => comment.id === commentIdToRemove
      );
      let listDeComentarios = [...comments.list];
      listDeComentarios.splice(indexComentario, 1);
      setComments({ ...comments, list: listDeComentarios });
    }
    setCommentIdToRemove(null);
  };

  useEffect(() => {
    bookId && fetchComments();
  }, [commentsListPage, bookId]);

  const fnCreateReportComment = async () => {
    try {
      await createReportComment({
        comentario_id: commentIdToReport,
        reporte: {
          motivo: commentDescriptionToReport,
          estado: "pendiente",
          categoria: commentSelectToReport,
        },
      });
    } catch (error) {
      console.error("Error report create:", error);
    }
  };

  const fetchCommentsCategoryReport = async () => {
    try {
      const categoriesData = await getReportCommentCategory();
      setCategoryCommentReport(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCommentReport = () => {
    if (!commentDescriptionToReport || !commentSelectToReport) {
      setErrorCommentMotive(true);
      return;
    }
    toast.success("Comentario Reportado");
    fnCreateReportComment();
    setCommentIdToReport("");
    setCommentDescriptionToReport("");
    setCommentSelectToReport("");
    setErrorCommentMotive(false);
  };

  const handleCancelCommentReport = () => {
    setCommentIdToReport("");
    setCommentDescriptionToReport("");
    setCommentSelectToReport("");
    setErrorCommentMotive(false);
  };

  const handleReport = (id) => {
    fetchCommentsCategoryReport();
    setCommentIdToReport(id);
  };

  return (
    <>
      <Modal
        open={Boolean(commentIdToRemove)}
        onHide={() => setCommentIdToRemove(null)}
        onSave={removeComment}
        title="Eliminar Comentario"
      >
        <span>¿Estás seguro de eliminar este comentario?</span>
      </Modal>
      <Modal
        open={Boolean(commentToEdit)}
        onHide={() => setCommentToEdit(null)}
        onSave={handleUpdateComment}
        title="Editar Comentario"
      >
        <div className="relative">
          <textarea
            className="border rounded-lg p-3 w-full border-gray-400 outline-none"
            value={commentToEdit?.comentario ?? ""}
            onChange={(event) =>
              handleCommentToUpdateChange(event.target.value)
            }
            rows={5}
            maxLength={500}
          />
          <span className="absolute bottom-2 right-2 text-xs text-gray-400">
            {commentToEdit?.comentario.length ?? 0}/500
          </span>
        </div>
      </Modal>
      <section className="flex flex-wrap">
        <div className="w-full _lg:w-1/2 px-9 _lg:px-16 min-w-96 py-4 flex flex-col gap-3">
          <span className="font-extrabold text-xl">Comentarios</span>
          <div className="flex gap-2 flex-wrap justify-end">
            <div className="flex gap-2 min-w-80 flex-grow relative">
              <ProfileView username={username} imagen={profile} size={8} />
              <textarea
                className="text-xs border rounded-lg p-3 flex-grow border-gray-400 outline-none"
                placeholder="Añadir un comentario"
                rows={5}
                value={comment}
                maxLength={500}
                onChange={(event) => {
                  if (event.target.value.length <= 700) {
                    setComment(event.target.value);
                  }
                }}
                onFocus={(event) => event.target.select()}
              />
              <span className="absolute top-2 right-2 text-xs text-gray-400">
                {comment.length}/500
              </span>
            </div>
            <button
              className="bg-colorPrimario text-white h-9 px-3 rounded-lg disabled:cursor-not-allowed"
              onClick={addComment}
              disabled={!Boolean(comment?.trim()?.length)}
            >
              Añadir
            </button>
          </div>
        </div>
        <div className="w-full _lg:w-1/2 px-9 _lg:px-16 py-4">
          <ul>
            {comments?.list?.map((item, index) => (
              <li key={index} className="border-b-[1px] border-gray-300 pb-2">
                <div className="text-xs flex flex-col gap-2">
                  <header className="flex justify-between flex-grow">
                    <div className="flex gap-2 items-center h-10">
                      <ProfileView
                        imagen={item?.profile}
                        username={item?.username}
                        size={8}
                      />
                      <span className="text-black font-semibold transition-all duration-100 hover:scale-105">
                        <Link href={`/user/${item?.username}`}>
                          <span>{item.username}</span>
                        </Link>
                      </span>
                      <span className="text-gray-400 whitespace-nowrap">
                        {moment(item.created_at).startOf("minutes").fromNow()}
                      </span>
                    </div>
                    {item.username === username && (
                      <Popover placement="left">
                        <PopoverHandler>
                          <button className="h-9">
                            <VscKebabVertical size={15} />
                          </button>
                        </PopoverHandler>
                        <PopoverContent className="shadow-lg p-1 border-gray-400">
                          <div className="p-1 flex flex-col text-xs text-black">
                            <span
                              className="cursor-pointer h-7 flex items-center text-gray-700 hover:text-black hover:bg-gray-100 rounded-sm px-2 "
                              onClick={() => setCommentIdToRemove(item.id)}
                            >
                              Eliminar
                            </span>
                            <span
                              className="cursor-pointer h-7 flex items-center text-gray-700 hover:text-black hover:bg-gray-100 rounded-sm px-2 dark:hover:bg-none"
                              onClick={() => setCommentToEdit(item)}
                            >
                              Editar
                            </span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                    {item.username !== username && (
                      <Popover placement="left">
                        <PopoverHandler>
                          <button className="h-9">
                            <VscKebabVertical size={15} />
                          </button>
                        </PopoverHandler>
                        <PopoverContent className="shadow-lg p-1 border-gray-400">
                          <div className="p-1 flex flex-col text-xs text-black">
                            <span
                              className="cursor-pointer h-7 flex items-center text-gray-700 hover:text-black hover:bg-gray-100 rounded-sm px-2"
                              onClick={() => handleReport(item.id)}
                            >
                              Denunciar
                            </span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}

                    {/*Report Modal*/}
                    <div
                      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
                        commentIdToReport ? "visible" : "invisible"
                      }`}
                    >
                      <div
                        className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
                          commentIdToReport && "visible"
                        }`}
                      >
                        <div className="bg-white rounded-lg p-8 dark:bg-dark-darkColorNeutral">
                          <h2 className="text-xl font-bold mb-4">
                            Reportar comentario
                          </h2>
                          <p className="mb-4">
                            ¿Estás seguro de que deseas denunciar este
                            comentario?
                          </p>
                          <div className="relative">
                            <textarea
                              className="w-full h-20 mb-4 border border-gray-400 rounded-lg p-2 pr-12"
                              placeholder="Describe el motivo del reporte"
                              value={commentDescriptionToReport}
                              onChange={(e) =>
                                setCommentDescriptionToReport(e.target.value)
                              }
                              maxLength={500}
                            />
                            <span className="absolute top-2 right-2 text-xs text-gray-400">
                              {commentDescriptionToReport.length}/500
                            </span>
                          </div>
                          <select
                            className="w-full mb-4 border border-gray-400 rounded-lg p-2"
                            value={commentSelectToReport}
                            onChange={(e) =>
                              setCommentSelectToReport(e.target.value)
                            }
                          >
                            <option value="">
                              Selecciona el motivo del reporte
                            </option>
                            {categoryCommentReport?.map((category) => (
                              <option key={category.id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {errorCommentMotive && (
                            <div className="text-red-500">
                              Por favor, describe y selecciona un motivo.
                            </div>
                          )}
                          <div className="flex justify-end">
                            <button
                              className="mr-2 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 dark:bg-red-600 dark:hover:bg-red-400 dark:border-red-600"
                              onClick={handleCancelCommentReport}
                            >
                              Cancelar
                            </button>
                            <button
                              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 dark:bg-dark-darkColorButtons dark:hover:bg-dark-darkColorHover"
                              onClick={handleCommentReport}
                            >
                              Enviar denuncia
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                  <p className="line-clamp-5">{item?.comentario}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center py-1">
            {commentsListPage < comments.total_pages && (
              <button
                className="bg-colorPrimario text-white h-9 rounded-md px-3 text-xs"
                onClick={() => setCommentsListPage(commentsListPage + 1)}
              >
                Ver más
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
