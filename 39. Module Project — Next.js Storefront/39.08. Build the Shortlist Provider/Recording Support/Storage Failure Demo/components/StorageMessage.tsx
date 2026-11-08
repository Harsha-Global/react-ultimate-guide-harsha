"use client";
import { usePublicShortlist } from "./PublicShortlistProvider";
export function StorageMessage(){const {message}=usePublicShortlist();return <p role="status">{message}</p>;}
