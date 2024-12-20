import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, refetch };
};

export default useAppWrite;
