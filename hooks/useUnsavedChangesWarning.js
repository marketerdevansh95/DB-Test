"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function useUnsavedChangesWarning({ name, path, content, metaTitle, metaDescription, image, active, order }) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(false);

  const originalData = useRef(null);

  if (originalData.current === null) {
    originalData.current = { name, path, content, metaTitle, metaDescription, image, active, order };
  }

  const hasUnsavedChanges = () => {
    return (
      name !== originalData.current.name ||
      path !== originalData.current.path ||
      content !== originalData.current.content ||
      metaTitle !== originalData.current.metaTitle ||
      metaDescription !== originalData.current.metaDescription ||
      image !== originalData.current.image ||
      active !== originalData.current.active ||
      order !== originalData.current.order
    );
  };
  useEffect(() => {
    const handlePopState = (e) => {
      if (hasUnsavedChanges()) {
        window.history.pushState(null, "", window.location.href);
        setPendingNavigation('back');
        setShowConfirmModal(true);
      } else {
        router.push("/admin/custom-pages");
      }
    };

    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges()) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [name, path, content, metaTitle, metaDescription, router]);

  const confirmLeave = () => {
    setShowConfirmModal(false);
    console.log("Leaving")
    console.log(pendingNavigation)

    if (pendingNavigation === 'back') {
      router.push("/admin/custom-pages");
    }
    setPendingNavigation(null);
  };

  const cancelLeave = () => {
    setShowConfirmModal(false);
    setPendingNavigation(null);
  };

  return { showConfirmModal, confirmLeave, cancelLeave };
}
